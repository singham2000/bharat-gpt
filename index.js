const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require('dotenv');
// const bcrypt = require("bcryptjs");
dotenv.config({ path: "./src/config/.env" });
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*", methods: ["GET", "POST", "DELETE", "PUT"] }));
app.use('/uploads', express.static('uploads'));
// const db1 = mysql.createConnection({
//   connectionLimit: 500,
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "bharatgpt",
// });

// db1.connect(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected!");
//   }
// });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const landing = require("./src/routes/landingPage");
// const contact = require("./src/routes/contacts");
// const theming = require("./src/routes/theming");
// const aboutus = require("./src/routes/aboutus");
const user = require("./src/routes/userRoute");
const content = require("./src/routes/content");
// app.use("/api/landing_page", landing);
// app.use("/api/contact", contact);
// app.use("/api/theming", theming);
// app.use("/api/aboutus", aboutus);
app.use("/api/content", content);
app.use("/api/user", user);
// app.use("/api/landing_page",(req,res)=>{
//   res.status(200).json({
//     "sfd":"sdf"
//   })
// })

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("running");
});

// module.exports = { db1 };
