import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { authRouter } from './routes/authRoutes';
import { doctorRouter } from './routes/doctorRoutes';
import { serviceRouter } from './routes/serviceRoutes';
import { appointmentRouter } from './routes/appointmentRoutes';
import connectionDB from './database/db';

// Load environment variables
dotenv.config();

// server IP
const app = express();
const PORT = process.env.PORT || 5001;

// MongoDB Connection
connectionDB();

// Middleware
app.use(express.json());
app.use(cors())

// Basic route
app.get('/', (_req, res) => {
    res.json({ message: 'Server is running Working!' });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/doctors', doctorRouter);
app.use('/api/service', serviceRouter);
app.use('/api/appointments', appointmentRouter);


app.listen(PORT, () => {
    console.log('Over the network server will listen', PORT)
})