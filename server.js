require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const userRouter = require("./router/userRouter");
const User = require("./models/users");
const { MONGO_URI } = process.env;

// mongoose settings (4)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// express 기본 세팅 (1)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우터 세팅 (2)
app.use("/user", userRouter);

// ejs 세팅 (3)
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// index 세팅 (5)
app.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { users: users });
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});