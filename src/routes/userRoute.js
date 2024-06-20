const express = require("express");
const router = express.Router();

const { addUser, login } = require("../controllers/userController");

router.route("/user").post(addUser);
router.route("/login").post(login);

module.exports = router;
