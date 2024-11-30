import express from "express";
import { configureRoutes } from "./Routes";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { errorMiddleware } from "./Middleware/error";

dotenv.config();
const app = express();
app.use(express.json());

configureRoutes(app);
app.use(errorMiddleware);
const connectionMongodb = process.env.MONGODB_URL;
if (connectionMongodb !== undefined) {
  mongoose
    .connect(connectionMongodb)
    .then((value) => {
      console.log("connected successfully to the mongodb database");

      const port = process.env.PORT || 3000;
      app.listen(port, () => {
        console.log(`listening on localhost:${port}`);
      });
    })
    .catch((error) => {
      console.log("An error occurred while connecting to the database", error);
      process.exit(1);
    });
}
