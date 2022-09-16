const { Router } = require("express");
const route = Router();
const AuthController = require("../controllers/AuthController");

route.get("/login", AuthController.signIn);

module.exports = route;
