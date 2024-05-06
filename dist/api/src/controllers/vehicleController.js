"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getAllVehicle = void 0;
const database_1 = __importDefault(require("../config/database"));
const mongodb_1 = require("mongodb");
const getAllVehicle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield (0, database_1.default)("Routes", "Vehicles");
        const page = parseInt(request.query.page) || 1;
        const pageSize = parseInt(request.query.pageSize) || 10;
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalVehicles = yield collection.find().count();
        const vehicles = yield collection
            .find()
            .skip(startIndex)
            .limit(pageSize)
            .toArray();
        const totalPages = Math.ceil(totalVehicles / pageSize);
        const hasNextPage = endIndex < totalVehicles;
        const data = {
            message: "Lista de vehículos",
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalItems: totalVehicles,
            hasNextPage: hasNextPage,
            data: vehicles,
        };
        response.status(200).send(JSON.stringify({
            message: "All vehicles",
            data: data,
        }));
    }
    catch (_a) {
        response.status(500).send(JSON.stringify({
            message: "Internal Server Error",
        }));
    }
});
exports.getAllVehicle = getAllVehicle;
const createVehicle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const collection = yield (0, database_1.default)("Routes", "Vehicles");
        const vehicleValidate = yield collection.findOne({ placa: body.placa });
        if (vehicleValidate !== null) {
            return response.status(404).send(JSON.stringify({
                message: "El vehiculo ya existe",
            }));
        }
        const result = yield collection.insertOne(body);
        response.status(201).send(JSON.stringify({
            message: "create message",
            data: result,
        }));
    }
    catch (_b) {
        response.status(500).send(JSON.stringify({
            message: "Internal Server Error",
        }));
    }
});
exports.createVehicle = createVehicle;
const updateVehicle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const body = request.body;
        delete body._id;
        const collection = yield (0, database_1.default)("Routes", "Vehicles");
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: body });
        if (result.modifiedCount === 1) {
            response.status(200).send(JSON.stringify({
                message: "Vehículo actualizado con éxito",
            }));
        }
        else {
            response.status(404).send(JSON.stringify({
                message: "Vehículo no encontrrado",
            }));
        }
    }
    catch (_c) {
        response.status(500).send(JSON.stringify({
            message: "Internal Server Error",
        }));
    }
});
exports.updateVehicle = updateVehicle;
const deleteVehicle = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const collection = yield (0, database_1.default)("Routes", "Vehicles");
        const result = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        if (result.deletedCount === 1) {
            response.status(200).send(JSON.stringify({
                message: "Vehículo Se elimino con exito",
            }));
        }
        else {
            response.status(404).send(JSON.stringify({
                message: "Vehículo no encontrrado",
            }));
        }
    }
    catch (_d) {
        response.status(500).send(JSON.stringify({
            message: "Internal Server Error",
        }));
    }
});
exports.deleteVehicle = deleteVehicle;
