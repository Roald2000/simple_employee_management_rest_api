require("dotenv").config({ path: "./.env.local", override: true });

const express = require("express");

const app = express();

const cors = require("cors");
const { logger } = require("./src/app.helper");
const { after } = require("./src/app.middleware");
const { sequelize } = require("./src/sqlz");

// const { swaggerJsDoc, swaggerOptions, swaggerUI } = require("./docs.swagger");

app.use(cors());
app.use(express.json());

// const specs = swaggerJsDoc(swaggerOptions);
// app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use("/api", require("./src/routes.js"));

app.use(after.invalidRoute);
app.use(after.errorMiddleware);

const api_port = process.env.api_port;

sequelize
  .authenticate()
  .then(async () => {
    app.listen(
      api_port,
      logger(
        "Database Connected",
        `API is being served @ http://localhost:${api_port}`
      )
    );
    await sequelize.sync({ alter: true }); //! Uncomment to sync data models in database > ctrl+s to save/refresh
  })
  .catch((err) => {
    logger("Database Connection Fail", err);
  });
