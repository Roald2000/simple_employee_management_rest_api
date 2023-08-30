const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Employee Management REST API",
      version: "1.0.0",
      description: "A Simple REST API that manages Employee related data",
    },
    servers: [{ url: "http://localhost:1290" }],
  },
  apis: ["./src/routes/*.js", "./src/routes.js"],
};

module.exports = { swaggerUI, swaggerJsDoc, swaggerOptions };
