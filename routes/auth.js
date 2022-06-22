const express = require('express')
const auth = express.Router()
const db = require("./db/index.js");

const passport = require("passport");
const bcrypt = require("bcrypt");

auth.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const query = "SELECT password FROM users WHERE email = $1";
      const values = [email];
      const user = await db.query(query, values);
      const matchedPassword = await bcrypt.compare(
        password,
        user.rows[0].password
      );
  
      if (matchedPassword) {
        return res.status(200).send("Welcome back!");
      }
      res.status(500).send("Wrong email or password");
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
  });
  
auth.get("/register", async (req, res) => {
const {
    email,
    password,
    firstName,
    lastName,
    streetAddress,
    city,
    region,
    postalCode,
    country,
} = req.body;

try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const query =
    "INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
    const values = [
    email,
    hashedPassword,
    firstName,
    lastName,
    streetAddress,
    city,
    region,
    postalCode,
    country,
    ];
    const newUser = await db.query(query, values);
    console.log(newUser);

    if (newUser) {
    return res.status(201).json({
        msg: "Success",
        newUser,
    });
    }
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
}
});

module.exports = auth