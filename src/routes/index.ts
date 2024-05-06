import { Router } from 'express';
import operatorRoute from "./operators/operators"
import vehiclesRouter from "./vehicles/vehicle"
import routerRouter from "./vehicleRoutes/vehicleRoutes"
import tripsRouter from "./trips/trips"

const router = Router();

router.use("/", operatorRoute)
router.use("/", vehiclesRouter)
router.use("/", routerRouter)
router.use("/", tripsRouter)

export default router