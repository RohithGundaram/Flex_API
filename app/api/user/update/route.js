import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"


export async function PUT(request){
    const {email,emergencyContact}=await request.json()
    await connectMongo()

    await Users.findOneAndUpdate({email: email},{
        emergencyContact
    })
    return NextResponse.json({message:"User details updated"},{status:201})
}

export async function POST(request){
    const {email,MacAddress}=await request.json()
    await connectMongo()

    await Users.findOneAndUpdate({email: email},{
        MacAddress
    })
    return NextResponse.json({message:"User details updated"},{status:201})
}

