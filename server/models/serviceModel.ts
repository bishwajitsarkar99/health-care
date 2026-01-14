import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String },
    description: { type: String },
});

export const Service = mongoose.model("Service", serviceSchema);