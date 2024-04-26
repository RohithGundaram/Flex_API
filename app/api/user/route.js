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

export async function POST(request){
    const {email,deviceToken}=await request.json()
    await connectMongo()

    await Users.findOneAndUpdate({email: email},{
        deviceToken
    })
    return NextResponse.json({message:"User details updated"},{status:201})
}
