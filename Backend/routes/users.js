const express = require("express");
const router = express.Router();
const userController = require("../controllers/users.js");

// Routes
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.post("/logout", userController.logout);

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
