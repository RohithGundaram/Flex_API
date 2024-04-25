import Users from "@/Models/Users"
import connectMongo from "@/libs/mongodb"
import { NextResponse } from "next/server"


export async function POST(request){
    const {email,password}=await request.json()
    await connectMongo()

    //write a logic to check whether the user already exist in Database
  const userDetails = await Users.findOne({email: email})

  if(userDetails){
    if(password==userDetails.password){
      return NextResponse.json({message:"Done"},{status:201})
    }
    else{
      return NextResponse.json({message:"Wrong Password"},{status:201})
    }
    
  }
    
    return NextResponse.json({message:"User doesn't exist"},{status:201})
}
