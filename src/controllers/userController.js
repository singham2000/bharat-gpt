const catchAsyncError = require("../utils/catchAsyncError");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");

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

exports.addUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db1.query(
    "INSERT INTO register ( email, password) VALUES (?,?,?,?,?)",
    [email, hashedPassword],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(true);
      }
    }
  );
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  db1.query(
    "SELECT * FROM register WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
        if (result != "") {
          const make = { result };
          //   const hashedPassword = bcrypt.hashSync(password, 8);
          //   const hashedb = bcrypt.hashSync(make.result[0].password, 8);
          //   console.log(bcrypt.compareSync(hashedPassword, hashedb));
          //   if (bcrypt.compareSync(hashedPassword, hashedb)) {
          if (make.result[0].password === password) {
            res.status(200).json({
              success: true,
              message: "Success logged in",
              result,
            });
          } else {
            res.status(200).json({
              success: false,
              message: "Password or email is incorrect!",
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: "User is not found!",
          });
        }
      }
    }
  );
});
