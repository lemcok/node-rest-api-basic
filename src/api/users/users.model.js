import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'NAME is necessary'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'EMAIL is necessary'],
        unique:true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, 'PASSWORD is necessary'],
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    roles: [{
        ref: "Role",
        type: Schema.Types.ObjectId
    }]  
}, {
    versionKey: false,
    timestamps: true,
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword);
}


const User = model('User', userSchema)
export default User

