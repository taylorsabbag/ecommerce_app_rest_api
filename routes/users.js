const express = require('express')
const users = express.Router()
const db = require("./db/index.js");

users.param("userEmail", (req, res, next, userEmail) => {
    const { userEmail } = req.params;
    next();
  });

users.get("/users", async (req, res) => {
try {
    const users = await db.query("SELECT * FROM users");
    return res.status(201).send(users.rows);
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
}
});

users.get("/users/:userEmail", async (req, res) => {
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
// users.put("/users/:userEmail", async (req, res) => {
//   const data = req.body

//   try {
//     const query = 'UPDATE users SET'
//     const values =
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ msg: "Failed" });
//   }
// })

users.delete("/users/:userEmail", async (req, res) => {
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

module.exports = users