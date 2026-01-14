import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String },
    title: { type: String },
    experience: { type: String },
    location: { type: String },
    image: { type: String },
    workingTime: { type: String },
    available: { type: String },
    time: { type: String },
    bio: { type: String },
    education: [{ type: String }],
    services: [{ type: String }],
});

export const Doctor = mongoose.model("Doctor", doctorSchema);