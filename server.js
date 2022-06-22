const express = require("express");
const app = express();
const db = require("./db/index.js");

const passport = require("passport");
const bcrypt = require("bcrypt");

const PORT = process.env.port || 3000;

app.use(express.json());

app.param("userEmail", (req, res, next, userEmail) => {
  const { userEmail } = req.params;
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  try {
    const users = await db.query("SELECT * FROM users");
    return res.status(201).send(users.rows);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
  }
});

app.get("/users/:userEmail", async (req, res) => {
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const values = [userEmail];
    const user = await db.query(query, values);

    if (!user) {
      return res.status(404).send("No user with that email");
    }
    res.send(user.rows[0]);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
  }
});

// TODO
// app.put("/users/:userEmail", async (req, res) => {
//   const data = req.body

//   try {
//     const query = 'UPDATE users SET'
//     const values =
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ msg: "Failed" });
//   }
// })

app.delete("/users/:userEmail", async (req, res) => {
  try {
    const query = "DELETE FROM users WHERE email = $1";
    const values = [userEmail];
    const user = await db.query(query, values);

    if (!user) {
      return res.send("No user with that email.");
    }

    res.sendStatus(204);
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
  }
});

app.post("/login", async (req, res) => {
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

app.get("/register", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
