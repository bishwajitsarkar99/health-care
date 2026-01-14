import { Request, Response } from "express"
import { Service } from "../schema"

// Service Fetch
const serviceFetch = async (req: Request, res: Response) => {
    const service = await Service.find({})
    if (!service) res.json({
        status: '404',
        message: 'there is no service data'
    })
    res.json({
        status: 'success',
        message: 'service fetch successfully ',
        data: service
    })
}

export {
    serviceFetch
}