import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:String,
    company:String
});
export const person = mongoose.model("Person", schema);
