"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RouterController_1 = require("../../controllers/RouterController");
const router = express_1.default.Router();
router.get("/routes", RouterController_1.getAllRoutes);
router.post("/routes", RouterController_1.createRoute);
router.patch("/routes/:id", RouterController_1.updateRoute);
router.delete("/routes/:id", RouterController_1.deleteRoute);
exports.default = router;
