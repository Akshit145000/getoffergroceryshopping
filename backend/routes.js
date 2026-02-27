const Router = require("express").Router();
const { registerUser, loginUser, logout } = require("./login.controller");
Router.post("/register", registerUser);
Router.post("/login", loginUser);
Router.post("/logout", logout);

// Admin routes
const { userData, createUserData } = require("./admin.controller");
const isAuthenticated = require("./isAuthenticated");
Router.get("/admin/users", isAuthenticated, userData);
Router.post("/admin/create", createUserData);

module.exports = Router;
