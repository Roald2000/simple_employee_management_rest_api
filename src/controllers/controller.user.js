const createHttpError = require("http-errors");
const { login, register, list } = require("../models/model.user");

const { compareSync, hashSync } = require("bcryptjs");
const { createResponse } = require("../app.helper");
const { generateToken } = require("../auth.jwt.service");

module.exports = {
  loginUser: async function (req, res, next) {
    try {
      const { username, password } = req.body;

      if (!username || username === undefined || username === null) {
        throw createHttpError.BadRequest("Invalid Username or Password");
      }

      if (!password || password === undefined || password === null) {
        throw createHttpError.BadRequest("Invalid Username or Password");
      }

      const data = await login({ username: username });

      if (!data || data === undefined || data === null || data.length === 0) {
        throw createHttpError.BadRequest("Invalid Username or Password");
      }

      const checkPass = compareSync(password, data.password);

      if (!checkPass) {
        throw createHttpError.BadRequest("Invalid Username, Password");
      }

      delete data?.dataValues?.password;

      createResponse(res, 200, {
        token: generateToken(data),
        data: data,
      });
    } catch (error) {
      next(error);
    }
  },
  registerUser: async function (req, res, next) {
    try {
      const { username, password } = req.body;

      await register({ username: username, password: hashSync(password, 8) });

      createResponse(res, 201, { message: "Register Success!" });
    } catch (error) {
      next(error);
    }
  },
  listUsers: async function (req, res, next) {
    try {
      let data = await list();
      createResponse(res, 200, { data: data });
    } catch (error) {
      next(error);
    }
  },
};
