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
const { MongoClient, ServerApiVersion } = require('mongodb');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const uri = "mongodb+srv://eduardobalinaslira:5N9qjUf1CPNYxnDH@cluster0.c8plphw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
//const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_CONNECTION}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
console.log(client);
const getCollections = (dbName, collectionName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Llego a la conexion");
        yield client.db("admin").command({ ping: 1 });
        const db = yield client.db(dbName);
        const collection = yield db.collection(collectionName);
        return collection;
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
});
exports.default = getCollections;
