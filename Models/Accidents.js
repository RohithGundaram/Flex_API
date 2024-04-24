import mongoose,{Schema} from "mongoose";

const accidentSchema=new Schema(
    {
        latitude:String,
        longitude:String,
        MacAddress:String,
        email:String,
        phone:String,
        emergencyContact:String//email
    },
    {
        timestamps:true
    }
)

const Accidents=mongoose.model("Accidents",accidentSchema)

export default Accidents
