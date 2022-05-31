import { Schema, model } from 'mongoose';

export const ROLES =["user", "admin", "seller"]

const roleSchema = new Schema({
    name: String
}, {
    versionKey: false
})

const Role =  model('Role', roleSchema)
export default Role