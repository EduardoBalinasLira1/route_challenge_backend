import { Request, Response } from "express";
import getCollections from "../config/database";
import { ObjectId } from "mongodb";

const getAllVehicle = async (request: Request, response: Response) => {

  try {
    const collection = await getCollections("Routes", "Vehicles");
    
    const page = parseInt(request.query.page as string) || 1; 
    const pageSize = parseInt(request.query.pageSize as string) || 10; 
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const totalVehicles = await collection.find().count();
    const vehicles = await collection
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
  
    return response.status(200).send(
      JSON.stringify({
        message: "All vehicles",
        data: data,
      })
    );
  } catch {
    return response.status(500).send(
      JSON.stringify({
        message: "Internal Server Error",
      })
    );
  }
  
};

const createVehicle = async (request: Request, response: Response) => {
  try {
    const body = request.body;

    const collection = await getCollections("Routes", "Vehicles");

    const vehicleValidate = await collection.findOne({ placa: body.placa });

    if (vehicleValidate !== null) {
      return response.status(404).send(
        JSON.stringify({
          message: "El vehiculo ya existe",
        })
      );
    }

    const result = await collection.insertOne(body);

    response.status(201).send(
      JSON.stringify({
        message: "create message",
        data: result,
      })
    );
  } catch {
    response.status(500).send(
      JSON.stringify({
        message: "Internal Server Error",
      })
    );
  }
};

const updateVehicle = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;

    const body = request.body;

    delete body._id;

    const collection = await getCollections("Routes", "Vehicles");

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.modifiedCount === 1) {
      response.status(200).send(
        JSON.stringify({
          message: "Vehículo actualizado con éxito",
        })
      );
    } else {
      response.status(404).send(
        JSON.stringify({
          message: "Vehículo no encontrrado",
        })
      );
    }
  } catch {
    response.status(500).send(
      JSON.stringify({
        message: "Internal Server Error",
      })
    );
  }
};

const deleteVehicle = async (request: Request, response: Response) => {
  try {
    const id = request.params.id;
    const collection = await getCollections("Routes", "Vehicles");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      response.status(200).send(
        JSON.stringify({
          message: "Vehículo Se elimino con exito",
        })
      );
    } else {
      response.status(404).send(
        JSON.stringify({
          message: "Vehículo no encontrrado",
        })
      );
    }
  } catch {
    response.status(500).send(
      JSON.stringify({
        message: "Internal Server Error",
      })
    );
  }
};

export { getAllVehicle, createVehicle, updateVehicle, deleteVehicle };
