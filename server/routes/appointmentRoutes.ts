import express from "express"
import { appiontmentBook, appiontmentFind, appointmentFetch } from "../controllers/appointmentController"

const router = express.Router();
router.get('/all', appointmentFetch);
router.post('/booking', appiontmentBook);
router.get('/:id', appiontmentFind);

export const appointmentRouter = router;