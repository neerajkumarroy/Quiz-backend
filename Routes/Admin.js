const express = require("express");
const { AdminSignup, AdminLogin } = require('../Controllers/Admin.js');

const router = express.Router();

router.route("/signup").post(AdminSignup);
router.route("/login").post(AdminLogin);

module.exports = router;
