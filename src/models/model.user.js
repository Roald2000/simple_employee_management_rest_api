const { DataTypes } = require("sequelize");
const { sequelize } = require("../sqlz");

const { v4 } = require("uuid");
const { uniq_id } = require("../app.helper");

const User = sequelize.define(
  "users_tbl",
  {
    user_id: {
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: uniq_id,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(["User", "Admin", "Guest"]),
      defaultValue: "User",
    },
    is_activated: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
  },
  { tableName: "users_tbl", freezeTableName: true, timestamps: true }
);

module.exports = {
  login: async function ({ username }) {
    return await User.findOne({ where: { username } });
  },
  register: async function ({ username, password }) {
    const setInput = User.build({
      user_id: v4(),
      username: username,
      password: password,
    });
    await setInput.save();
  },
  list: async function () {
    const result = await User.findAll();
    result.forEach((content) => {
      delete content.dataValues.password;
    });
    return result;
  },
  update: async function ({ username, password, is_admin }) {
    await User.update(
      {
        password: password,
        is_admin: is_admin,
      },
      { where: { username: username } }
    );
  },
};
