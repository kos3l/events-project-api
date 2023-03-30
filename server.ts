require("dotenv-flow").config();
// Import dependencies
import express from "express";
import mongoose from "mongoose";
import yaml from "yamljs";
import bodyParser from "body-parser";
import eventRoutes from "./routes/Event.routes";
import authRoutes from "./routes/Auth.routes";
const swaggerDefinition = yaml.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");
import { Request, Response } from "express";
// Import auth middleware
import { verifyToken } from "./middleware/Token.middleware";
// Create express app
const app: express.Application = express();

// Set up swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use(bodyParser.json());

// Routes
app.get("/api/welcome", (req: Request, res: Response) => {
  res.status(200).send({ message: "Welcome to the MEN-REST-API" });
});

app.use("/api/user", authRoutes);
app.use("/api/event", eventRoutes);

// Open mongoose connection
mongoose
  .connect(process.env.DBHOST!)
  .catch((error) => console.log("Error connecting to MongoDb: " + error));
mongoose.connection.once("open", () =>
  console.log("Connected succesfully to MongoDb!")
);

// Set the port
const PORT = process.env.PORT || 4000;

// Listen to requests
app.listen(PORT, function () {
  console.log("Server is running on port: " + PORT);
});

export { app };
