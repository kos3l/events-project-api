"use strict";
const router = require("express").Router();
const authController = require("../controllers/authController");
// route: /api/user/register/
router.post("/register", authController.register);
// route: /api/user/login/
router.post("/login", authController.login);
module.exports = router;
