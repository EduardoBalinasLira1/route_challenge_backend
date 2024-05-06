import { Request, Response } from "express";
import getCollections from "../config/database";

const getAllTrips = async ( request: Request, response: Response ) => {
    try {
        const collection = await getCollections("Routes", "Trips");

        const data = await collection.find().toArray()
    
        response.status(200).send(JSON.stringify({
            "message": "All Trips",
            "data":data
        }))
    }catch {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",

        }))
    }
    
}

const createTrip =  async ( request: Request, response: Response ) => {
    try {
        const body = request.body;

        const collection = await getCollections("Routes", "Trips");

        const result = await collection.insertOne(body)
            
        response.status(201).send(JSON.stringify({
            "message": "create message",
            "data": result
        }))

    } catch {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",

        }))
    }


}

export {
    getAllTrips,
    createTrip,
    
}