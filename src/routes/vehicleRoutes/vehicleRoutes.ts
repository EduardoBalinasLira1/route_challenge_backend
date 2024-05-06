import express, { Request, Response } from "express";
import { createRoute, deleteRoute, getAllRoutes, updateRoute } from "../../controllers/RouterController";

const router = express.Router()

router.get("/routes", getAllRoutes)

router.post("/routes", createRoute)

router.patch("/routes/:id", updateRoute)

router.delete("/routes/:id", deleteRoute)
export default router