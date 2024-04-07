import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"


export async function PUT(request){
    const {email,phone,MacAddress,emergencyContact,deviceToken}=await request.json()
    await connectMongo()

    await Users.findOneAndUpdate({email: email},{
        phone,MacAddress,emergencyContact,deviceToken
    })
    return NextResponse.json({message:"User details updated"},{status:201})
}

