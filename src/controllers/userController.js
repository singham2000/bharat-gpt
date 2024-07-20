const catchAsyncError = require("../utils/catchAsyncError");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { queryRec } = require("../utils/mails");
const secretKey = process.env.secretKey;
const expiresIn = process.env.expiresIn;
const db1 = mysql.createConnection({
  connectionLimit: 500,
  user: process.env.user,
  host: process.env.host,
  password: process.env.password,
  database: process.env.database,
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
  db1.query("SELECT * FROM register WHERE id=?", [email], (err, result) => {
    if (err) {
      db1.query(
        "INSERT INTO register ( email, password) VALUES (?,?)",
        [email, hashedPassword],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(true);
          }
        }
      );
    } else {
      res.send(400).json({
        success: false,
        message: "This email is already registered.",
      });
    }
  });
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  db1.query(
    "SELECT * FROM register WHERE email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (result != "") {
          const make = { result };
          const hashedb = make.result[0].password;

          const payload = {
            ...make.result[0],
          };

          if (bcrypt.compareSync(password, hashedb)) {
            const token = jwt.sign(payload, secretKey, { expiresIn });
            queryRec(email, `sfsdf`, `sdfsdf`);
            res.status(200).json({
              success: true,
              message: "Success logged in",
              token,
            });
          } else {
            res.status(400).json({
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

exports.sendMail = catchAsyncError(async (req, res, next) => {
  const { email, name, country, number, role, query, description } = req.body;
  try {
    queryRec(email, name, country, number, role, query, description);
    res.status(200).json({
      message: "Sent",
    });
  } catch (error) {
    res.status(400).json({
      message: "bad request",
    });
  }
});
