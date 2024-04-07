import Accidents from "@/Models/Accidents"
import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"

export async function POST(request){
    const {latitude,longitude,MacAddress}=await request.json()
    await connectMongo()
    await Accidents.create({latitude,longitude,MacAddress})
    const riderDetails = await Users.findOne({MacAddress})
    console.log(riderDetails);
    const emergContact = riderDetails.emergencyContact
    const token = await Users.findOne({email: emergContact})
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
            "Authorization" : "key=AAAAHvVhYzE:APA91bEAY_L6B03MsQULZbi08oeLkfiBuE1QPm-yON_ZStjHli8bpR_G5oAB4oskS4bxsMlruprajw4jUHJsWz7jwzNFCuVuUo_Ht3Klkjk6p_GI003aQ_KR3ACgrD37tw69NX1XR99o",
        },
        body: JSON.stringify(notificationData),
    })
        .then((response)=> response.json())
        .then((responseData)=>{
            console.log(JSON.stringify(responseData));
        })
    return NextResponse.json({message: "Accident occured"},{status:201})
}

export async function GET(){
    await connectMongo()
    const res=await Accidents.find()
    return NextResponse.json({res})
    
}