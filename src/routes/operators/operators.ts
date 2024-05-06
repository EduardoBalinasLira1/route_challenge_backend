import express from "express";
import { createOperator, deleteOperator, getAllOperators, updateOperator } from "../../controllers/OperatorController";

const router = express.Router()

router.get("/operators", getAllOperators)

router.post("/operators",createOperator)

router.patch("/operators/:id", updateOperator)

router.delete("/operators/:id", deleteOperator)

export default router