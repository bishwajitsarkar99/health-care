import {Request, Response} from "express"
import { Doctor } from "../schema"

// Post Doctor
const uploaded = async (req: Request, res: Response)=> {
    const doctors = req.body;
    const doctor = await Doctor.insertMany(doctors)
    res.json({
        status: 'success',
        message: "Doctors uploaded successfully",
        data: doctor
    })
}

// Doctor Find base on id
const findDoctor = async (req: Request, res: Response) => {
    const id = req.params.id;
    const doctor = await Doctor.findById(id) // when initeger id then findOne({id}) and id will be defined Number(req.params.id)
    if (!doctor) res.json({
        message: 'Doctor not found'
    })
    res.json({
        message: 'Doctor found',
        data: doctor
    })
}

// Doctor Fetch Data
const doctorFetch = async (req: Request, res: Response) => {
    const doctor = await Doctor.find({})
    if (!doctor) res.json({
        status: '404',
        message: 'there is no doctor data'
    })

    res.json({
        status: 'success',
        data: doctor,
        message: 'doctor data fetch successfully '
    })
}

export {
    uploaded,
    findDoctor,
    doctorFetch
}