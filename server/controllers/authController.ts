import { Request, Response } from 'express';
import { User } from '../schema';
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';


// Register User
const register = async (req: Request, res: Response) => {
    const { name, email, phone, password } = req.body;

    if (!name && !email && !phone && !password) res.status(400).json({
        message: "User email not found."
    })

    const hasedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        id: Date.now(),
        name,
        email,
        phone,
        password: hasedPassword
    })
    const userData = await user.save()
    res.json({
        status: 'success',
        message: "User created successfully",
        data: userData
    })
}

// User Login
const userLogin = async (req: Request, res: Response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json("User email not found");
        }

        if(!user.password){
            return res.status(400).json("User password not found");
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY || "secret_key", {expiresIn: "1h"});
            res.json({ success: true, message: "User logged", token, user: { id: user.id, email: user.email } });
        }else{
            return res.status(404).json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        res.status(500).json({success: false, message: (error as Error).message})
    }
    
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
    deleteUser,
    userLogin
}
