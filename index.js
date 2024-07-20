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
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const user = require("./src/routes/userRoute");
const content = require("./src/routes/content");
app.use("/api/content", content);
app.use("/api/user", user);

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("running");
});
