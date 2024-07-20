const express = require("express");
const router = express.Router();

const { addUser, login, sendMail } = require("../controllers/userController");

router.route("/user").post(addUser);
router.route("/login").post(login);
router.route("/sendMail").post(sendMail);

module.exports = router;
