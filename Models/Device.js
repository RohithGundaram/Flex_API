import mongoose,{Schema} from "mongoose";

const DeviceSchema=new Schema(
    {
        email:String,
        MacAddress:String
    },
    {
        timestamps:true
    }
)

const Device=mongoose.models.Device||mongoose.model("Device",DeviceSchema)

export default Device