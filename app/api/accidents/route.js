import Accidents from "@/Models/Accidents"
import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(request){
    const {latitude,longitude,MacAddress}=await request.json()
    await connectMongo()
    
    const riderDetails = await Users.findOne({MacAddress})
    console.log(riderDetails);
    const emergencyContact = riderDetails.emergencyContact
    const phone=riderDetails.phone
    const email=riderDetails.email
    
    await Accidents.create({latitude,longitude,MacAddress,email,phone,emergencyContact})
    const token = await Users.findOne({email: emergencyContact})
    console.log(token);
    const notificationData = {
        "to": token.deviceToken,
        "notification": {
            "body":  "Alert",
            "title": "Accident Occured at " + "http://maps.google.com/maps?q=loc:"+latitude+","+longitude,
            "subtitle": "http://maps.google.com/maps?q=loc:"+latitude+","+longitude
        }
    }
    const result=await fetch("https://fcm.googleapis.com/fcm/send",{
        method:"POST",
        headers:{
            

"Content-Type": "application/json",
"Authorization": "key=AAAA8JOEjn8:APA91bFfMpQX6azYe1HXRG2T1HcZ9F14LwViinP4UR029CJs4boF3ImAcTY4EycHowhcWSCqIBOXdk6MKoNvnC4EaFY9pSQ-Mw3nwqsuyrvo0h0_1C0H0auYYP6TCYgvmxXg53hE9cPV"

        },
        body:JSON.stringify(notificationData)
        
    })

    const ress=result.json()

     
    return NextResponse.json({message: "Accident occured",ress},{status:201})
}

export async function GET(){
    await connectMongo()
    const res=await Accidents.find().sort({ createdAt: -1 })
    return NextResponse.json({res})
    
}
