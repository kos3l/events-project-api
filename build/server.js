"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv-flow").config();
// Import dependencies
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const yamljs_1 = __importDefault(require("yamljs"));
const body_parser_1 = __importDefault(require("body-parser"));
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const swaggerDefinition = yamljs_1.default.load("./swagger.yaml");
const swaggerUi = require("swagger-ui-express");
// Import auth middleware
const { verifyToken } = require("./validations/auth.validation");
// Create express app
const app = (0, express_1.default)();
// Set up swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));
app.use(body_parser_1.default.json());
// Routes
app.use("/api/user", authRoutes);
app.use("/api/event", verifyToken, eventRoutes);
// Open mongoose connection
mongoose_1.default
    .connect(process.env.DBHOST)
    .catch((error) => console.log("Error connecting to MongoDb: " + error));
mongoose_1.default.connection.once("open", () => console.log("Connected succesfully to MongoDb"));
// Set the port
const PORT = process.env.PORT || 4000;
// Listen to requests
app.listen(PORT, function () {
    console.log("Server is running on port: " + PORT);
});
module.exports = app;
