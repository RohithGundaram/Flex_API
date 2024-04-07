import mongoose from "mongoose";

const connectMongo=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to mongodb")
    }catch(err){
        console.log(err)
    }
}

export default connectMongo