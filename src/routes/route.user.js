const { deauth, authMiddleWare } = require("../auth.jwt.service");
const controllerUser = require("../controllers/controller.user");
const router = require("express").Router();

router.post("/login", controllerUser.loginUser);

router.post("/register", controllerUser.registerUser);

router.delete("/logout", authMiddleWare, deauth);
 

router.get("/users", authMiddleWare, controllerUser.listUsers);

module.exports = router;
