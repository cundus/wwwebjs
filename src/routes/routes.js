const { Router } = require("express");
const route = Router();
const AuthController = require("../controllers/AuthController");
const ChatController = require("../controllers/ChatController");

route.get("/login", AuthController.signIn);
route.get("/check-auth", AuthController.checkAuth);
route.post("/blast", ChatController.sendMessage);

module.exports = route;
