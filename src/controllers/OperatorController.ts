import { Request, Response } from "express";
import getCollections from "../config/database";
import { ObjectId } from "mongodb";

const getAllOperators = async ( request: Request, response: Response ) => {

  try {
    const collection = await getCollections("Routes", "Operators");

    const page = parseInt(request.query.page as string) || 1; // Número de página
    const pageSize = parseInt(request.query.pageSize as string) || 10; // Tamaño de la página
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const totalOperators = await collection.find().count();
    const operators = await collection
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
  
    response.status(200).send(
      JSON.stringify({
        message: "All routes",
        data: data,
      })
    );
  } catch {
    response.status(500).send(JSON.stringify({
      "message": "Internal Server Error",
  }))
  }
  
}

const createOperator = async ( request: Request, response: Response ) => {
    
    try {
        const body = request.body

        const collection = await getCollections("Routes", "Operators");

        const operatorValidate = await collection.findOne({ email: body.email })
        
        if(operatorValidate !== null) {
            return response.status(404).send(JSON.stringify({
                "message": "El operador ya existe ya existe"
            }))
        }
        delete body._id        
    
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

const updateOperator = async ( request: Request, response: Response ) => {
    try {
        const id = request.params.id
        
        const body = request.body

        const collection = await getCollections("Routes", "Operators");

        delete body._id

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: body });
        
        if (result.modifiedCount === 1) {
            response.status(201).send(JSON.stringify({
                "message": "Actualizado",
            }))
        } else {
            response.status(404).send(JSON.stringify({
                "message": "No actualizado",
            }))
        }
    } catch {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }))
    }
}

const deleteOperator = async (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      const collection = await getCollections("Routes", "Operators");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      console.log(result);
      if (result.deletedCount === 1) {
        response.status(200).send(
          JSON.stringify({
            message: "Vehículo Se eloimimo con exito",
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

export {
    createOperator,
    getAllOperators,
    updateOperator,
    deleteOperator
}