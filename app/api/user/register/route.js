import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"


export async function POST(request){
    const {email,password,phone,MacAddress,emergencyContact}=await request.json()
    await connectMongo()

    //write a logic to check whether the user already exist in Database
    await Users.create({email,password,phone,MacAddress,emergencyContact})
    return NextResponse.json({message:"User registered"},{status:201})
}


//remove this get() in final build
export async function GET(){
    await connectMongo()
    const res=await Users.find()
    return NextResponse.json({res})
}
