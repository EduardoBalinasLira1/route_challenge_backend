import express, { Request, Response } from "express";
import { createVehicle, deleteVehicle, getAllVehicle, updateVehicle } from "../../controllers/vehicleController";
const router = express.Router()

router.get("/vehicles" , getAllVehicle)

router.post("/vehicles" , createVehicle)

router.patch("/vehicles/:id" , updateVehicle)

router.delete("/vehicles/:id" , deleteVehicle)

export default router;