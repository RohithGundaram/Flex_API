import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"

export async function PUT(request){

    const {email}=await request.json()
    await connectMongo()

    const userDetails = await Users.findOne({email: email})
    const Details={
        email:userDetails.email,
        phone:userDetails.phone,
        MacAddress:userDetails.MacAddress,
        emergencyContact:userDetails.emergencyContact,
        deviceToken:userDetails.deviceToken
    }
    return NextResponse.json(Details,{status:201})
}

