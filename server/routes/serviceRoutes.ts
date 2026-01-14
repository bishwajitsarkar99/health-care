import express from "express"
import { serviceFetch } from "../controllers/serviceController"

const router = express.Router();

router.get('/fetch', serviceFetch);

export const serviceRouter = router;