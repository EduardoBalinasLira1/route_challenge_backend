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
exports.createTrip = exports.getAllTrips = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllTrips = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const collection = yield (0, database_1.default)("Routes", "Trips");
        const data = yield collection.find().toArray();
        response.status(200).send(JSON.stringify({
            "message": "All Trips",
            "data": data
        }));
    }
    catch (_a) {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }));
    }
});
exports.getAllTrips = getAllTrips;
const createTrip = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = request.body;
        const collection = yield (0, database_1.default)("Routes", "Trips");
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
exports.createTrip = createTrip;
