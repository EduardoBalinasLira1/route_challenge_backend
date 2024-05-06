"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const operators_1 = __importDefault(require("./operators/operators"));
const vehicle_1 = __importDefault(require("./vehicles/vehicle"));
const vehicleRoutes_1 = __importDefault(require("./vehicleRoutes/vehicleRoutes"));
const trips_1 = __importDefault(require("./trips/trips"));
const router = (0, express_1.Router)();
router.use("/", operators_1.default);
router.use("/", vehicle_1.default);
router.use("/", vehicleRoutes_1.default);
router.use("/", trips_1.default);
exports.default = router;
