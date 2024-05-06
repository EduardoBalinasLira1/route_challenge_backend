"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../../controllers/vehicleController");
const router = express_1.default.Router();
router.get("/vehicles", vehicleController_1.getAllVehicle);
router.post("/vehicles", vehicleController_1.createVehicle);
router.patch("/vehicles/:id", vehicleController_1.updateVehicle);
router.delete("/vehicles/:id", vehicleController_1.deleteVehicle);
exports.default = router;
