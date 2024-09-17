import mongoose, {Schema} from "mongoose";

const gifSchema =new Schema({
    gifFile: {
        type:String,
        required:true
    },
    // thumbnail: {
    //     type:String,
    //     required:true
    // },
    title: {
        type:String,
        required:true
    },
    duration: {
        type: Number, //cloudinary
        required:true
    },
    owner: {
        type:Schema.Types.ObjectId,
        ref: "User"
    },

},{timestamps:true})



export const GIF = mongoose.model("GIF",gifSchema)