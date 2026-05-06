import mongoose from "mongoose";

const expense = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        default:"some fixing is"
    },
    date:{
        type: Date,
        required: true
    }
},{timeStamps: true});

export const Expenses = mongoose.model("Expenses", expense);