const createHttpError = require("http-errors");
const { createResponse, uniq_id } = require("../app.helper");
const {
  EmployeeWorkAssignment,
  EmployeePersonalInfo,
} = require("../models/model.employee");

async function isEmployeeValid(personal_id) {
  try {
    return await EmployeePersonalInfo.findOne({
      where: { personal_id: personal_id },
    });
  } catch (error) {
    logger("Function isEmployeeValid", error);
    throw error;
  }
}
async function isEmployeeWorkAssignmentValid(employee_id) {
  try {
    return await EmployeeWorkAssignment.findOne({
      where: { employee_id: employee_id },
    });
  } catch (error) {
    logger("Function isEmployeeWorkAssignmentValid", error);
    throw error;
  }
}

module.exports = {
  //#region //! Employee Work Assignment Route Controllers

  employee_work_assignment: async function (req, res, next) {
    try {
      const { department, position, position_level, personal_id } = req.body;
      const isFound = await EmployeePersonalInfo.findOne({
        where: { personal_id: personal_id },
      });
      if (!isFound?.dataValues) {
        throw createHttpError.NotFound("Employee is not registered");
      } else {
        const buildData = EmployeeWorkAssignment.build({
          department: department,
          position: position,
          position_level: position_level,
          personal_id: personal_id,
        });
        const savedData = await buildData.save();
        savedData &&
          createResponse(res, 201, { message: "Employment Success!" });
      }
    } catch (error) {
      next(error);
    }
  },

  find_employee_work_assignment: async function (req, res, next) {
    try {
      const result = await EmployeeWorkAssignment.findOne({
        where: { employee_id: req.params.employee_id },
      });
      if (!result || !result?.dataValues) {
        throw createHttpError.NotFound(`Found Nothing`);
      } else {
        createResponse(res, 200, { data: result, message: "FOUND" });
      }
    } catch (error) {
      next(error);
    }
  },

  update_employee_work_assignment: async function (req, res, next) {
    try {
      const { employee_id } = req.params;
      const { personal_id, department, position, position_level } = req.body;

      const isRegistered = await isEmployeeValid(personal_id);

      if (!isRegistered || !isRegistered?.dataValues) {
        throw createHttpError.BadRequest("Is not registered as an employee");
      } else {
        const isAnEmployee = await isEmployeeWorkAssignmentValid(employee_id);
        if (!isAnEmployee || !isAnEmployee?.dataValues) {
          throw createHttpError.BadRequest("Is not currently assigned");
        } else {
          const isUpdated = await EmployeeWorkAssignment.update(
            {
              department: department,
              position: position,
              position_level: position_level,
              personal_id: personal_id,
            },
            { where: { employee_id: employee_id } }
          );
          isUpdated &&
            createResponse(res, 200, {
              message: "Employee assignment is now updated!",
            });
        }
      }
    } catch (error) {
      next(error);
    }
  },

  delete_employee_work_assignment: async function (req, res, next) {
    try {
      const { employee_id } = req.params;

      await EmployeeWorkAssignment.destroy({
        where: { employee_id: employee_id },
      });

      createResponse(res, 200, {
        message: "Employee assignment removed/deleted",
      });
    } catch (error) {
      next(error);
    }
  },
  //#endregion

  //#region //! Employee Personal Information Route Controllers
  get_employee_personal_info: async function (req, res, next) {
    try {
      createResponse(res, 200, {
        data: await EmployeePersonalInfo.findAll(),
      });
    } catch (error) {
      next(error);
    }
  },
  employee_personal_info: async function (req, res, next) {
    try {
      const buildData = EmployeePersonalInfo.build({
        ...req.body,
        personal_id: uniq_id,
      });

      const isCreated = await buildData.save();

      isCreated &&
        createResponse(res, 201, {
          message: "EmployeeWorkAssignment Created",
          data: req.body,
        });
    } catch (error) {
      next(error);
    }
  },

  find_employee_personal_info: async function (req, res, next) {
    try {
      const result = await EmployeePersonalInfo.findOne({
        where: {
          personal_id: req.params.personal_id,
        },
      });

      if (!result || !result?.dataValues) {
        throw createHttpError.NotFound(`Found Nothing`);
      } else {
        createResponse(res, 200, { data: result, message: "FOUND" });
      }
    } catch (error) {
      next(error);
    }
  },

  update_employee_personal_info: async function (req, res, next) {
    try {
      const { personal_id } = req.params;
      const isRegistered = await isEmployeeValid(personal_id);

      if (!isRegistered || !isRegistered?.dataValues) {
        throw createHttpError.NotFound("");
      } else {
        const isUpdated = await EmployeePersonalInfo.update(
          { ...req.body },
          { where: { personal_id: personal_id } }
        );

        isUpdated &&
          createResponse(res, 201, {
            message: "Employee Personal Info Updated!",
          });
      }
    } catch (error) {
      next(error);
    }
  },

  delete_employee_personal_info: async function (req, res, next) {
    try {
      await EmployeePersonalInfo.destroy({
        where: { personal_id: req.params.personal_id },
      });

      createResponse(res, 204);
    } catch (error) {
      next(error);
    }
  },
  //#endregion
  employee_details: async function (req, res, next) {
    try {
      EmployeePersonalInfo.hasMany(EmployeeWorkAssignment, {
        foreignKey: {
          name: "personal_id",
        },
      });

      const includesAssignments = await EmployeePersonalInfo.findAll({
        include: EmployeeWorkAssignment,
      });

      if (includesAssignments.length !== 0) {
        throw createHttpError.NotFound("No Employees were found");
      } else {
        createResponse(res, 200, { data: includesAssignments });
      }
    } catch (error) {
      next(error);
    }
  },
};
