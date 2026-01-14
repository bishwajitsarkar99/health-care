import { Request, Response } from 'express';
import { User } from '../schema';

// Register User
const register = async (req: Request, res: Response) => {
    const { name, email, phone } = req.body;
    console.log('name:', name)
    if (!name && !email && !phone) res.status(400).json({
        status: '',
        message: "name not found"
    })
    const user = new User({
        id: Date.now(),
        name,
        email,
        phone
    })
    const userData = await user.save()
    res.json({
        status: 'success',
        message: "User created successfully",
        data: userData
    })
}

// Get All User
const getUser = async (req: Request, res: Response) => {

    const user = await User.find({});
    if (!user) res.json({
        status: '404',
        message: 'there is no user data'
    })
    res.json({
        status: 'success',
        message: 'user data fetch sucessfully ',
        data: user
    })
}

// FUT User
const updateUser = async (req: Request, res: Response) => {
    const { id, name, email, phone } = req.body;
    if (!name && !email && !phone) res.status(400).json({
        status: '',
        message: "name not found"
    })
    console.log("id", id)
    const user = await User.findByIdAndUpdate(id, { name, email, phone })
    console.log("user", user)
    res.json({
        status: 'success',
        message: "User updated successfully",
        data: user
    })
}

// Delete User
const deleteUser = async(req: Request, res: Response) => {
    const { id } = req.body;
    console.log("id", id)
    const user = await User.findByIdAndDelete(id)
    console.log("user", user)
    res.json({
        status: 'success',
        message: "User deleted successfully",
        data: user
    })
}


export {
    register,
    getUser,
    updateUser,
    deleteUser
}
