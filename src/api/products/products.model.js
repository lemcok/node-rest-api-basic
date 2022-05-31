import { Schema, model } from 'mongoose';

const productSchema = new Schema({
    name: String,
    category: String,
    price: Number,
    image: String,
},{
    timestamps: true,
    versionKey: false,
})

const Product = model('Product', productSchema);
export default Product