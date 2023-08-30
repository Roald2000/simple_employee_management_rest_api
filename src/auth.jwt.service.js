const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const { sequelize } = require("./sqlz");
const { DataTypes } = require("sequelize");
const { createResponse, uniq_id } = require("./app.helper");

const BlackList = sequelize.define(
  "blacklist",
  {
    t_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      unique: true,
      defaultValue: uniq_id,
    },
    token: {
      type: DataTypes.TEXT("long"),
    },
  },
  { tableName: "blacklist", freezeTableName: true, timestamps: true }
);

const secret_key = process.env.secret_key;
const secret_key_life = process.env.secret_key_life;

const generateToken = (payload) => {
  return jwt.sign({ user: payload }, secret_key, {
    expiresIn: secret_key_life,
  });
};

const verifyToken = async (token) => {
  try {
    if (!token || token === undefined || token === null || token == "") {
      throw createHttpError.Forbidden("Invalid Token, " + token ?? undefined);
    } else {
      const isBlackListed = await BlackList.findAll({
        where: { token: token },
      });

      if (isBlackListed.length > 0) {
        throw createHttpError.Unauthorized("Invalid Token, access denied");
      } else {
        const verified = jwt.verify(token, secret_key);
        if (verified.exp < Date.now() / 1000) {
          throw createHttpError.Unauthorized("Invalid Token, expired");
        } else {
          return verified.user;
        }
      }
    }
  } catch (error) {
    throw error;
  }
};

const authMiddleWare = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw createHttpError.Forbidden("Invalid Token, " + token ?? undefined);
    } else {
      token = token.split(" ")[0] === "Bearer" ? token.split(" ")[1] : token;
      req.auth = await verifyToken(token);
      next();
    }
  } catch (error) {
    next(error);
  }
};

const deauth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    token = token.split(" ")[0] === "Bearer" ? token.split(" ")[1] : token;
    const setBlacklist = await BlackList.create({ token: token });
    setBlacklist && createResponse(res, 204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateToken,
  authMiddleWare,
  deauth,
};
