const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");
const { getLogo, addLogo } = require("../controllers/themeController");

router
.route("/logo").post(upload.single("file"), addLogo).get(getLogo);

module.exports = router;
