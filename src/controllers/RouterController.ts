import { Request, Response } from "express";
import getCollections from "../config/database";
import { ObjectId } from "mongodb";


const getAllRoutes = async (request: Request, response: Response) => {

  try {
    const collection = await getCollections("Routes", "Routes");

    const page = parseInt(request.query.page as string) || 1;
    const pageSize = parseInt(request.query.pageSize as string) || 10; 
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
  
    const totalRoutes = await collection.find().count();
    const routes = await collection
      .find()
      .skip(startIndex)
      .limit(pageSize)
      .toArray();
  
    const totalPages = Math.ceil(totalRoutes / pageSize);
    const hasNextPage = endIndex < totalRoutes;
    const data = {
      message: "Lista de rutas",
      page: page,
      pageSize: pageSize,
      totalPages: totalPages,
      totalItems: totalRoutes,
      hasNextPage: hasNextPage,
      data: routes,
    };
  
    response.status(200).send(
      JSON.stringify({
        message: "All vehicles",
        data: data,
      })
    );
  } catch {
    response.status(500).send(JSON.stringify({
      "message": "Internal Server Error",
  }))
  }
  
}

const createRoute = async (request: Request, response: Response) => {

    try {
        const body = request.body    
    
        const collection = await getCollections("Routes", "Routes");

        const routeValidate = await collection.findOne({ name: body.name})

        if(routeValidate !== null) {
            return response.status(404).send(JSON.stringify({
                "message": "La rute ya existe"
            }))
        }
        delete body._id

        const result = await collection.insertOne(body)
                
        response.status(201).send(JSON.stringify({
            "message": "Ruta creada",
            "data": result
        }))
    } catch {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }))
    }
}

const updateRoute = async ( request: Request, response: Response ) => {
    try {
        const id = request.params.id
        
        const body = request.body

        const collection = await getCollections("Routes", "Routes");

        delete body._id

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: body });
        
        if (result.modifiedCount === 1) {
            response.status(201).send(JSON.stringify({
                "message": "Ruta actualizado",
            }))
        } else {
            response.status(404).send(JSON.stringify({
                "message": "Ruta no actualizada",
            }))
        }
    } catch {
        response.status(500).send(JSON.stringify({
            "message": "Internal Server Error",
        }))
    }
}

const deleteRoute = async (request: Request, response: Response) => {
    try {
      const id = request.params.id;
      const collection = await getCollections("Routes", "Routes");
      const result = await collection.deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 1) {
        response.status(200).send(
          JSON.stringify({
            message: "La ruta se elimino correctamente",
          })
        );
      } else {
        response.status(404).send(
          JSON.stringify({
            message: "Ruta no encontrada",
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
    getAllRoutes,
    createRoute,
    updateRoute,
    deleteRoute
}