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
exports.deleteOperator = exports.updateOperator = exports.getAllOperators = exports.createOperator = void 0;
const database_1 = __importDefault(require("../config/database"));
const mongodb_1 = require("mongodb");
const getAllOperators = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield (0, database_1.default)("Routes", "Operators");
        const page = parseInt(request.query.page) || 1; // Número de página
        const pageSize = parseInt(request.query.pageSize) || 10; // Tamaño de la página
        const startIndex = (page - 1) * pageSize;
        const endIndex = page * pageSize;
        const totalOperators = yield collection.find().count();
        const operators = yield collection
            .find()
            .skip(startIndex)
            .limit(pageSize)
            .toArray();
        const totalPages = Math.ceil(totalOperators / pageSize);
        const hasNextPage = endIndex < totalOperators;
        const data = {
            message: "Lista de operadores",
            page: page,
            pageSize: pageSize,
            totalPages: totalPages,
            totalItems: totalOperators,
            hasNextPage: hasNextPage,
            data: operators,
        };
        response.status(200).send(JSON.stringify({
            message: "All routes",
            data: data,
        }));
    }
    catch (_a) {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }));
    }
});
exports.getAllOperators = getAllOperators;
const createOperator = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const collection = yield (0, database_1.default)("Routes", "Operators");
        const operatorValidate = yield collection.findOne({ email: body.email });
        if (operatorValidate !== null) {
            return response.status(404).send(JSON.stringify({
                "message": "El operador ya existe ya existe"
            }));
        }
        delete body._id;
        const result = yield collection.insertOne(body);
        response.status(201).send(JSON.stringify({
            "message": "create message",
            "data": result
        }));
    }
    catch (_b) {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }));
    }
});
exports.createOperator = createOperator;
const updateOperator = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const body = request.body;
        const collection = yield (0, database_1.default)("Routes", "Operators");
        delete body._id;
        const result = yield collection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: body });
        if (result.modifiedCount === 1) {
            response.status(201).send(JSON.stringify({
                "message": "Actualizado",
            }));
        }
        else {
            response.status(404).send(JSON.stringify({
                "message": "No actualizado",
            }));
        }
    }
    catch (_c) {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }));
    }
});
exports.updateOperator = updateOperator;
const deleteOperator = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const collection = yield (0, database_1.default)("Routes", "Operators");
        const result = yield collection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
        console.log(result);
        if (result.deletedCount === 1) {
            response.status(200).send(JSON.stringify({
                message: "Vehículo Se eloimimo con exito",
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
exports.deleteOperator = deleteOperator;
