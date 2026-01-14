import { Request, Response } from "express";
import { Appointment } from "../schema";

// Appointment Fetch Data
const appointmentFetch = async (req: Request, res: Response ) => {
    const appointment = await Appointment.find({});
    if (!appointment) res.json({
        status: '404',
        message: 'there is no appointment data'
    })
    res.json({
        status: 'success',
        message: 'appointment fetch successfully ',
        data: appointment
    })
}

// Appointment Find out base on id
const appiontmentFind = async (req: Request, res: Response) => {
    const id = req.params.id;
    const appointment = await Appointment.findById(id);
    if (!appointment) res.json({
        status: '404',
        message: 'there is no appointment data'
    })
    res.json({
        status: 'success',
        message: 'appointment fetch successfully ',
        data: appointment
    })
}

// Post Appointment Book
const appiontmentBook = async (req: Request, res: Response) => {
    const { patientName, email, phone, reason, time, doctorId, doctorName, date, service } = req.body;

    if (!patientName && !email && !phone && !time && !doctorId && !doctorName && !date && !service) res.json({
        status: '404',
        message: 'there is no appointment data'
    });

    const appointment = new Appointment({
        id: Date.now(),
        patientName,
        email,
        phone,
        doctorId,
        doctorName,
        service,
        date,
        time,
        reason
    });

    const data = await appointment.save()

    res.json({
        status: 'success',
        message: 'appointment submited successfully ',
        data: data
    });
}

export {
    appointmentFetch,
    appiontmentFind,
    appiontmentBook
}