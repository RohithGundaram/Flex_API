import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"

export async function PUT(request){

    const {email}=await request.json()
    await connectMongo()

    const userDetails = await Users.findOne({email: email})
    return NextResponse.json(userDetails,{status:201})
}

