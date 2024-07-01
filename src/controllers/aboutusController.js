const catchAsyncError = require("../utils/catchAsyncError");
const mysql = require("mysql");

const db1 = mysql.createConnection({
  connectionLimit: 500,
  user: "root",
  host: "localhost",
  password: "",
  database: "bharatgpt",
});

db1.connect(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected!");
  }
});

exports.addAboutusHeading = catchAsyncError(async (req, res, next) => {
  const { topHeading, mainHeading } = req.body;
  if (!req.file)
    return res.status(400).json({
      success: false,
    });
  const fileBuffer = req.file.buffer;
  const base64String = await fileBuffer.toString("base64");
  await db1.query(
    "INSERT INTO aboutus (topHeading, mainHeading,image) VALUES (?,?,?)",
    [topHeading, mainHeading, base64String],
    (err, result) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: "Error occurred",
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "Saved successfully",
        });
      }
    }
  );
});

exports.getAboutusHeading = catchAsyncError(async (req, res, next) => {
  db1.query("SELECT * FROM aboutus", (err, result) => {
    if (err) {
      res.status(400).json({
        success: true,
        message: "Error Occurred",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Fetched",
        result,
      });
    }
  });
});

exports.aboutUsCardAdd = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.body);
  const fileBuffer = req.file.buffer;
  const base64String = await fileBuffer.toString("base64");
  const imageData = {
    bg_img: base64String,
  };

  // Convert the object to JSON string
  const json = JSON.stringify(imageData);
  db1.query(
    "INSERT INTO aboutuscard (image,title,description) VALUES (?,?,?)",
    [json, title, description],
    (err, result) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: "Failed to add About-US card" + err,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Added About-US card",
        });
      }
    }
  );
});

exports.getAboutusCard = catchAsyncError(async (req, res, next) => {
  db1.query("SELECT * FROM aboutuscard", (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Failed to save about us card",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "fetched",
        result,
      });
    }
  });
});

exports.deleteAboutUsCard = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  await db1.query(
    "DELETE FROM aboutuscard WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting About us card:", err);
        res.status(500).json({
          success: false,
          message: "Failed to delete About us card",
          error: err.message,
        });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: "About us card deleted successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "About us card not found",
          });
        }
      }
    }
  );
});

exports.updateAboutUsCard = catchAsyncError(async (req, res, next) => {
  const { title, description } = req.body;
  const { id } = req.query;

  let sql = "UPDATE aboutuscard SET ";
  const values = [];

  if (title) {
    sql += "title=?, ";
    values.push(title);
  }
  if (description) {
    sql += "description=?, ";
    values.push(description);
  }
  if (req.file) {
    const fileBuffer = req.file.buffer;
    const base64String = fileBuffer.toString("base64");
    const imageData = {
      bg_img: base64String,
    };
    const json = JSON.stringify(imageData);
    sql += "image=?, ";
    values.push(json);
  }
  sql = sql.slice(0, -2);

  sql += " WHERE id = ?";
  values.push(id);

  db1.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating about us card:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update about us card",
        error: err,
      });
    }
    console.log("About us card updated successfully");
    res.status(200).json({
      success: true,
      message: "About us card updated successfully",
    });
  });
});
