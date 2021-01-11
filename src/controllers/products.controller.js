import { json } from 'express';
import Product from '../models/Product';

export const createProducts = async (req, res) => {
    const newProduct = new Product({...req.body});
    const productSave = await newProduct.save();
    res.status(201).json(productSave);
}

export const getProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

export const getProductById = async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id, 
        req.body,
        {new: true}, //para q te devuelva el product actualizado
    );


    res.status(200).json(updatedProduct);
}

export const deleteProductById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
}
