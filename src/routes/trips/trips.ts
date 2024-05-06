import express from "express";
import { createTrip, getAllTrips } from "../../controllers/TripController";
const router = express.Router()

router.get("/trips" , getAllTrips)

router.post("/trips" , createTrip)


export default router;