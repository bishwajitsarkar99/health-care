import express from "express"
import { uploaded, findDoctor, doctorFetch } from "../controllers/doctorController"

const router = express.Router();

router.get('/all', doctorFetch);
router.post('/uploadMany', uploaded);
router.get('/:id', findDoctor);

export const doctorRouter = router;