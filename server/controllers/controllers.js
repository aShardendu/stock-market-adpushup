import mongoose from 'mongoose';
import Model from "../models/model.js";

export const getData = async(req, res) => {
    try{
        const Models = await Model.find();
        res.status(200).json(Models);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const postData = async(req, res) => {
    console.log("req",req);
    const list = req.body;
    console.log("list",list);
    const newList = new Model({
        COMPANY_NAME: list['2. name'],
        SYMBOL: list['1. symbol'],
        CURRENCY: list['8. currency'],
        PRICE: list['9. matchScore']
    });
    try{
        const finalList = await newList.save();
        res.status(201).json(finalList);
    }catch (error){
        res.status(409).json({ message: error.message });
    }
}

export const deleteData = async(req, res) => {
    // console.log(req.body);
    const id = req.body['_id'];
    console.log(id);
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No pots with that symbol.');

    await Model.findOneAndDelete(id);
    res.json({ message: 'Stock detail deleted Successfully!' });
    // console.log(res);
}