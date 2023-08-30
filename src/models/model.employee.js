const { DataTypes } = require("sequelize");
const { sequelize } = require("../sqlz");
const { uniq_id } = require("../app.helper");

const EmployeeWorkAssignment = sequelize.define(
  "employee_work_assignment",
  {
    employee_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
      defaultValue: uniq_id,
    },
    department: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    position_level: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    personal_id: {
      type: DataTypes.STRING(255),
      primaryKey: false,
      allowNull: false,
      unique: false,
      references: { model: "employee_personal_info", key: "personal_id" },
    },
  },
  {
    tableName: "employee_work_assignment",
    freezeTableName: true,
    timestamps: true,
  }
);

const EmployeePersonalInfo = sequelize.define(
  "employee_personal_info",
  {
    personal_id: {
      type: DataTypes.STRING(255),
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: uniq_id,
    },
    last_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    middle_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email_address: {
      type: DataTypes.STRING(255),
      allowNull: false, 
    },
    contact_number: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    current_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    permanent_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "employee_personal_info",
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = { EmployeeWorkAssignment, EmployeePersonalInfo };
