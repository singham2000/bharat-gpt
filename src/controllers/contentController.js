const catchAsyncError = require("../utils/catchAsyncError");
const mysql = require("mysql");

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

exports.getContent = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  try {
    if (id) {
      await db1.query(
        `SELECT * FROM content_table WHERE id=${id}`,
        (err, result) => {
          if (err) {
            res.status(400).json({
              success: false,
              message: "An error has occurred",
            });
          } else {
            res.status(200).json({
              success: true,
              message: "Fetched",
              result,
            });
          }
        }
      );
    } else {
      await db1.query(`SELECT * FROM content_table`, (err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "An error has occurred",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Fetched",
            result,
          });
        }
      });
    }
  } catch (error) {}
});

exports.updateContent = catchAsyncError(async (req, res, next) => {
  const { id, display_content, content_type } = req.body;
  if (content_type === "img") {
    const file = req.file;
    if (!file) {
      res.status(400).send("No file uploaded.");
      return;
    }
    const fileName = file.filename;
    console.log(fileName, file);
    const filePath = file.path;
    // const fileBuffer = req.file.buffer;
    // const base64String = await fileBuffer.toString("base64");
    await db1.query(
      "UPDATE content_table SET display_content = ? WHERE id=?",
      [fileName, id],
      (err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Error has an occurred" + err,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Updated successfully",
          });
        }
      }
    );
  } else {
    db1.query(
      "UPDATE content_table SET display_content = ? WHERE id = ?",
      [display_content, id],
      (err, result) => {
        if (err) {
          res.status(400).json({
            success: false,
            message: "Error has an occurred" + err,
          });
        } else {
          res.status(200).json({
            success: true,
            message: "Updated successfully",
          });
        }
      }
    );
  }
});

exports.updateStatus = catchAsyncError(async (req, res, next) => {
  const { id, status } = req.query;

  await db1.query(
    "UPDATE content_table SET (status) VALUES(?) WHERE id=?",
    [status, id],
    (err, result) => {
      if (err) {
        res.send(400).json({
          success: false,
          message: "Cannot update data",
        });
      } else {
        res.send(200).json({
          success: true,
          message: "updated successfully",
        });
      }
    }
  );
});
