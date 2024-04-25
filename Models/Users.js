import mongoose,{Schema} from "mongoose";

const userSchema=new Schema(
    {
        email:String,
        password:String,
        phone:String,
        MacAddress:String,
        emergencyContact:String,   //email
        deviceToken:String
    },
    {
        timestamps:true
    }
)

const Users=mongoose.models.Users||mongoose.model("Users",userSchema)

export default Users
