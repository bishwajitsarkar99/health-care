import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    date: { type: String },
    time: { type: String },
    patientName: { type: String },
    email: { type: String },
    phone: { type: String },
    doctorId: { type: String },
    doctorName: { type: String },
    service: { type: String },
    reason: { type: String },
});

export const Appointment = mongoose.model("Appoinment", appointmentSchema);