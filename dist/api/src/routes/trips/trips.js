"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TripController_1 = require("../../controllers/TripController");
const router = express_1.default.Router();
router.get("/trips", TripController_1.getAllTrips);
router.post("/trips", TripController_1.createTrip);
exports.default = router;
