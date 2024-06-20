const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");
const {
  addAboutusHeading,
  getAboutusHeading,
  aboutUsCardAdd,
  getAboutusCard,
  deleteAboutUsCard,
  updateAboutUsCard,
} = require("../controllers/aboutusController");

router
  .route("/aboutus")
  .post(upload.single("file"), addAboutusHeading)
  .get(getAboutusHeading);
router
  .route("/aboutuscard")
  .post(upload.single("file"), aboutUsCardAdd)
  .get(getAboutusCard)
  .delete(deleteAboutUsCard)
  .put(upload.single("file"), updateAboutUsCard);

module.exports = router;
