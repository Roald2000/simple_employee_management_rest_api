const createHttpError = require("http-errors");
const controllerEmployee = require("../controllers/controller.employee");

const router = require("express").Router();

 
router.get("/employee_details", controllerEmployee.employee_details);
router.get(
  "/employee_personal_info",
  controllerEmployee.get_employee_personal_info
);

//#region //! Employee Work Assignment Routes
router.post(
  "/employee_work_assignment",
  controllerEmployee.employee_work_assignment
);

router.get(
  "/employee_work_assignment/:employee_id",
  controllerEmployee.find_employee_work_assignment
);
router.put(
  "/employee_work_assignment/:employee_id",
  controllerEmployee.update_employee_work_assignment
);
router.delete(
  "/employee_work_assignment/:employee_id",
  controllerEmployee.delete_employee_work_assignment
);
//#endregion

//#region //! Employee Personal Information Routes
router.post(
  "/employee_personal_info",
  controllerEmployee.employee_personal_info
);
router.get(
  "/employee_personal_info/:personal_id",
  controllerEmployee.find_employee_personal_info
);
router.put(
  "/employee_personal_info/:personal_id",
  controllerEmployee.update_employee_personal_info
);
router.delete(
  "/employee_personal_info/:personal_id",
  controllerEmployee.delete_employee_personal_info
);
//#endregion

module.exports = router;
