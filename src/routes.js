const { authMiddleWare } = require("./auth.jwt.service");

const router = require("express").Router();

router.use("/user", require("./routes/route.user"));
router.use("/employee", authMiddleWare, require("./routes/route.employee"));

module.exports = router;
