import Accidents from "@/Models/Accidents"
import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"

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
    fetch("https://fcm.googleapis.com/fcm/send",{
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Authorization" : String(process.env.FCM_TOKEN),
        },
        body: JSON.stringify(notificationData),
    })
        .then((response)=> response.json())
        .then((responseData)=>{
            console.log("Sent notification");
            console.log(JSON.stringify(responseData));
        })
    return NextResponse.json({message: "Accident occured"},{status:201})
}

export async function GET(){
    await connectMongo()
    const res=await Accidents.find()
    return NextResponse.json({res})
    
}
