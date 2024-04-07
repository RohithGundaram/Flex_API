import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"


export async function POST(request){
    const {email,phone,MacAddress,emergencyContact,deviceToken}=await request.json()
    await connectMongo()

    //write a logic to check whether the user already exist in Database
    await Users.create({email,phone,MacAddress,emergencyContact,deviceToken})
    return NextResponse.json({message:"User registered"},{status:201})
}


//remove this get() in final build
export async function GET(){
    await connectMongo()
    const res=await Users.find()
    return NextResponse.json({res})
}