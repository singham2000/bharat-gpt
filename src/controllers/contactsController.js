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

exports.addContacts = catchAsyncError(async (req, res, next) => {
  const { socialName, link } = req.body;
  try {
    db1.query(
      "INSERT INTO socialLinks (socialName, link) VALUES (?,?)",
      [socialName, link],
      (err, result) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Error saving your social",
          });
        } else {
          return res.status(200).json({
            success: true,
            message: "Saved",
            result,
          });
        }
      }
    );
  } catch (error) {}
});

exports.getContacts = catchAsyncError(async (req, res, next) => {
  db1.query("SELECT * FROM socialLinks", (err, result) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: "An error has occurred",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Fetch is success",
        result,
      });
    }
  });
});

exports.deleteContact = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  await db1.query(
    "DELETE FROM socialLinks WHERE id = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Error deleting socialLinks:", err);
        res.status(500).json({
          success: false,
          message: "Failed to delete socialLinks ",
          error: err.message,
        });
      } else {
        if (result.affectedRows > 0) {
          res.status(200).json({
            success: true,
            message: "socialLinks  deleted successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "socialLinks  not found",
          });
        }
      }
    }
  );
});

exports.updateContacts = catchAsyncError(async (req, res, next) => {
  const { socialName, link } = req.body;
  const { id } = req.query;

  let sql = "UPDATE socialLinks SET ";
  const values = [];

  if (socialName) {
    sql += "socialName=?, ";
    values.push(socialName);
  }
  if (link) {
    sql += "link=?, ";
    values.push(link);
  }

  // Remove trailing comma and space
  sql = sql.slice(0, -2);

  sql += " WHERE id = ?";
  values.push(id);

  db1.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error updating social link:", err);
      return res.status(500).json({
        success: false,
        message: "Failed to update social link",
        error: err,
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Social link not found",
      });
    }
    console.log("Social link updated successfully");
    res.status(200).json({
      success: true,
      message: "Social link updated successfully",
      result: result,
    });
  });
});
