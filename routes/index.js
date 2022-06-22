const express = require("express");
const app = express();
const db = require("../db/index.js");

const passport = require("passport");
const bcrypt = require("bcrypt");

const usersRouter = require('./users')
app.use('/users', usersRouter)
const authRouter = require('./auth')
app.use(['/login', '/register'], authRouter)

const PORT = process.env.port || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
