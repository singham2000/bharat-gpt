const express = require("express");
const router = express.Router();
const { upload } = require("../utils/upload");
const {
  addBannerImage,
  addBannerText,
  addGallery,
  getGalleryVideos,
  getBannerImages,
  getBannerText,
  deleteBannerImage,
  deleteGallery,
  updateBannerImage,
} = require("../controllers/landingController");

router
  .route("/landing_page_image")
  .post(upload.single("file"), addBannerImage)
  .get(getBannerImages)
  .delete(deleteBannerImage)
  .put(upload.single("file"), updateBannerImage);

router.route("/landing_page_text").post(addBannerText).get(getBannerText);

router
  .route("/gallery_videos")
  .post(addGallery)
  .get(getGalleryVideos)
  .delete(deleteGallery);

module.exports = router;
