const createHttpError = require("http-errors");
const { createResponse, logger } = require("./app.helper");

module.exports = {
  after: {
    invalidRoute: function (req, res, next) {
      next(createHttpError.NotFound("Invalid Route"));
    },
    errorMiddleware: function (err, req, res, next) {
      logger(err);
      const responseCode = err.status ?? err.statusCode;
      const errMessage = err.msg ?? err.message;
      createResponse(res, responseCode ?? 500, {
        message: errMessage ?? "Internal Server Error",
        error: `ERROR : [${err}]`,
      });
    },
  },
};
