const moment = require("moment/moment");

const { v4 } = require("uuid");

const currentDateTime = moment(new Date()).format("YYYY-MM-DD, hh:mm:ss A");

function logger(...data) {
  console.log(currentDateTime, "---", [...data].join(" --- "));
}

const validator = require("validator");

function removeSpecialCharacters(text) {
  // Regular expression to allow letters, numbers, hyphens, and underscores
  const regex = /^[a-zA-Z0-9_-]+$/;
  return regex.test(text) ? text : "";
}

// Define a function to sanitize an object
function sanitizeInput(input) {
  const clean = {};
  for (let key in input) {
    if (input.hasOwnProperty(key)) {
      // Remove special characters from text fields
      if (typeof input[key] === "string") {
        clean[key] = removeSpecialCharacters(input[key]);
      } else {
        // Don't sanitize non-text fields
        clean[key] = input[key];
      }
      // Sanitize text fields using validator.escape()
      clean[key] = validator.escape(clean[key]);
    }
  }
  return clean;
}

module.exports = {
  sanitizeInput,
  removeSpecialCharacters,
  currentDateTime,
  logger,
  createResponse: function (
    response,
    status = 200,
    options = Object | null | undefined
  ) {
    if (!options) {
      response.sendStatus(status);
    } else {
      response.status(status).send({ ...options });
    }
  },
  uniq_id: v4(),
  startListening: function (app, { port, dbConnection, interval }) {
    const startServer = () => {
      app.listen(port, logger(`API is now live @ ${port}`));
    };
    const checkAndStartServer = () => {
      dbConnection()
        .then(() => {
          console.log("Database Connected");
          startServer();
          clearInterval(checkInterval);
        })
        .catch((error) => {
          console.error("Database Connection Error:", error);
        });
    };
    const checkInterval = setInterval(checkAndStartServer, interval);
  },
};
