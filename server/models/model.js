import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    COMPANY_NAME:{
        type: String,
        required: true
    },
    SYMBOL: {
        type: String,
        required: true,
        unique: true
    },
    CURRENCY: {
        type: String,
        required: true
    },
    PRICE: {
        type: String,
        required: true
    },
    MARKET_CAP: String
});

const Model = mongoose.model('Model', postSchema);
export default Model;