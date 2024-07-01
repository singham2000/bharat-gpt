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

exports.addLogo = catchAsyncError(async (req, res, next) => {
  const fileBuffer = req.file.buffer;
  const base64String = await fileBuffer.toString("base64");
  console.log(base64String);
  await db1.query(
    "INSERT INTO theming (logo) VALUES (?)",
    [base64String],
    (err, result) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: "error occurred",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Uploaded",
        });
      }
    }
  );
});

exports.getLogo = catchAsyncError(async (req, res, next) => {
  db1.query("SELECT logo FROM theming", (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Error is Occurred" + err,
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

exports.addSiteName = catchAsyncError(async (req, res, next) => {
  const { siteName } = req.body;
  db1.query(
    "INSERT INTO theming (siteName) values (?)",
    [siteName],
    (err, result) => {
      if (err) {
        res.status(400).json({
          success: false,
          message: "error occurred",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Uploaded",
        });
      }
    }
  );
});

exports.getSiteName = catchAsyncError(async (req, res, next) => {
  db1.query("SELECT siteName FROM theming", (err, result) => {
    if (err) {
      res.status(400).json({
        success: false,
        message: "Added successfully",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Added successfully",
      });
    }
  });
});
