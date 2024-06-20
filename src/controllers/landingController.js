const catchAsyncError = require("../utils/catchAsyncError");
const mysql = require("mysql");
const uuid = require("uuid");
const db1 = mysql.createConnection({
  connectionLimit: 500,
  user: "sql12714953",
  host: "sql12.freemysqlhosting.net",
  password: "qB5DCPwyic",
  database: "sql12714953",
});

db1.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

exports.addBannerImage = catchAsyncError(async (req, res, next) => {
  const fileBuffer = req.file.buffer;
  const base64String = await fileBuffer.toString("base64");
  const { sub_title_1, sub_title_2, hero_title_1, hero_title_2, hero_support } =
    req.body;

  const id = uuid.v4();
  const json = `{
    "id": "${id}",
    "bg_img": "${base64String}",
    "sub_title_1": "${sub_title_1}",
    "sub_title_2": "${sub_title_2}",
    "hero_title_1": "${hero_title_1}",
    "hero_title_2": "${hero_title_2}",
    "hero_support": "${hero_support}"
  }`;

  await db1.query(
    "INSERT INTO bannerImages (bannerImages) VALUES (?)",
    [json],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
          message: "Uploaded",
        });
      }
    }
  );
});

exports.addBannerText = catchAsyncError(async (req, res, next) => {
  const { bannerText } = req.body;
  if (!bannerText) {
    res.status(400).json({
      success: false,
      message: "Banner text not provided",
    });
  }
  await db1.query(
    "INSERT INTO bannerText (bannerText) VALUES (?)",
    [bannerText],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json({
          success: true,
          message: "added",
        });
      }
    }
  );
});

exports.getBannerImages = catchAsyncError(async (req, res, next) => {
  await db1.query("SELECT * FROM bannerImages", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        success: true,
        message: "Fetched Successfully",
        result,
      });
    }
  });
});

exports.getBannerText = catchAsyncError(async (req, res, next) => {
  await db1.query("SELECT * FROM bannerText", (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Error occurred",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Fetched successfully",
        result: result,
      });
    }
  });
});

exports.addGallery = catchAsyncError(async (req, res, next) => {
  const { label, links } = req.body;
  console.log(label, links);
  await db1.query(
    "INSERT INTO gallery_videos (label, links) VALUES (?, ?)",
    [label, JSON.stringify(links)],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Failed to add video",
          error: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Video added successfully",
          result: result,
        });
      }
    }
  );
});

exports.deleteGallery = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  await db1.query(
    "DELETE FROM gallery_videos WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting gallery video:", err);
        res.status(500).json({
          success: false,
          message: "Failed to delete gallery video",
          error: err.message,
        });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: "Gallery video deleted successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Gallery video not found",
          });
        }
      }
    }
  );
});

exports.addGallery = catchAsyncError(async (req, res, next) => {
  const { label, links } = req.body;
  console.log(label, links);
  await db1.query(
    "INSERT INTO gallery_videos (label, links) VALUES (?, ?)",
    [label, JSON.stringify(links)],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          success: false,
          message: "Failed to add video",
          error: err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Video added successfully",
          result: result,
        });
      }
    }
  );
});

exports.updateGallery = catchAsyncError(async (req, res, next) => {
  const { label, links } = req.body;
  const { id } = req.query;

  let sql = "UPDATE gallery_videos SET ";
  const values = [];

  if (label) {
    sql += "label=?, ";
    values.push(label);
  }
  if (links) {
    sql += "links=?, ";
    values.push(JSON.stringify(links));
  }

  sql = sql.slice(0, -2);

  sql += " WHERE id = ?";
  values.push(id);

  db1.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating video:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update video",
        error: err,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }
    console.log("Video updated successfully");
    res.status(200).json({
      success: true,
      message: "Video updated successfully",
      result: result,
    });
  });
});

exports.getGalleryVideos = catchAsyncError(async (req, res, next) => {
  await db1.query("SELECT * FROM gallery_videos", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        success: true,
        message: "added",
        result,
      });
    }
  });
});

exports.deleteBannerImage = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  await db1.query(
    "DELETE FROM bannerImages WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting banner image:", err);
        res.status(500).json({
          success: false,
          message: "Failed to delete banner image",
          error: err.message,
        });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: "Banner image deleted successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Banner image not found",
          });
        }
      }
    }
  );
});

exports.updateBannerImage = catchAsyncError(async (req, res, next) => {
  const fileBuffer = req.file?.buffer; // Optional chaining to avoid errors if file is not present
  const base64String = fileBuffer ? fileBuffer.toString("base64") : null;

  const { sub_title_1, sub_title_2, hero_title_1, hero_title_2, hero_support } =
    req.body;

  let sql = "UPDATE bannerImages SET ";
  const values = [];

  if (base64String) {
    sql += "bannerImages = JSON_SET(bannerImages, '$.bg_img', ?), ";
    values.push(base64String);
  }

  if (sub_title_1 !== undefined) {
    sql += "bannerImages = JSON_SET(bannerImages, '$.sub_title_1', ?), ";
    values.push(sub_title_1);
  }

  if (sub_title_2 !== undefined) {
    sql += "bannerImages = JSON_SET(bannerImages, '$.sub_title_2', ?), ";
    values.push(sub_title_2);
  }

  if (hero_title_1 !== undefined) {
    sql += "bannerImages = JSON_SET(bannerImages, '$.hero_title_1', ?), ";
    values.push(hero_title_1);
  }

  if (hero_title_2 !== undefined) {
    sql += "bannerImages = JSON_SET(bannerImages, '$.hero_title_2', ?), ";
    values.push(hero_title_2);
  }

  if (hero_support !== undefined) {
    sql += "bannerImages = JSON_SET(bannerImages, '$.hero_support', ?), ";
    values.push(hero_support);
  }

  sql = sql.slice(0, -2); 
  sql += " WHERE id = ?";
  values.push(req.query.id);

  db1.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating banner image:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update banner image",
        error: err,
      });
    }
    console.log("Banner image updated successfully");
    res.status(200).json({
      success: true,
      message: "Banner image updated successfully",
    });
  });
});

