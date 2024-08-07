const catchAsyncError = require("../utils/catchAsyncError");
const mysql = require("mysql");

const dbConfig = {
  connectionLimit: 500,
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database,
};

let db1;

function connectToDatabase() {
  db1 = mysql.createConnection(dbConfig);

  db1.connect(function (err) {
    if (err) {
      console.error("Error connecting to the database:", err);
      console.log("Retrying in 3 seconds...");
      setTimeout(connectToDatabase, 3000); // Retry after 3 seconds
    } else {
      console.log("Connected!");
    }
  });
}

connectToDatabase();

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
              message: "An error has occurred" + err,
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
            message: "An error has occurred" + err,
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
    await db1.query(
      "UPDATE content_table SET display_content = ?,content_type=? WHERE id=?",
      [fileName, content_type, id],
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
