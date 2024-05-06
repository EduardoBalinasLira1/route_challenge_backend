"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const OperatorController_1 = require("../../controllers/OperatorController");
const router = express_1.default.Router();
router.get("/operators", OperatorController_1.getAllOperators);
router.post("/operators", OperatorController_1.createOperator);
router.patch("/operators/:id", OperatorController_1.updateOperator);
router.delete("/operators/:id", OperatorController_1.deleteOperator);
exports.default = router;
