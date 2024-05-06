import { Router } from 'express';
import operatorRoute from "./operators/operators"
import vehiclesRouter from "./vehicles/vehicle"
import routerRouter from "./vehicleRoutes/vehicleRoutes"
import tripsRouter from "./trips/trips"

const router = Router();

router.use("/api", operatorRoute)
router.use("/api", vehiclesRouter)
router.use("/api", routerRouter)
router.use("/api", tripsRouter)

export default router