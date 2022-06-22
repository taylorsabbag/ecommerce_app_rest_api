const express = require('express')
const carts = express.Router()
const db = require('../db/index');

carts.param("cartsId", (req, res, next) => {
    const { cartsId } = req.params;
    next();
  });

carts.get("/carts", async (req, res) => {
try {
    const carts = await db.query("SELECT * FROM carts");
    return res.status(201).send(carts.rows);
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
}
});

carts.get("/carts/:cartsId", async (req, res) => {
    try {
      const query = "SELECT * FROM carts WHERE id = $1";
      const values = [cartsId];
      const cart = await db.query(query, values);
  
      if (!cart) {
        return res.status(404).send("No cart with that id");
      }
      res.send(cart.rows[0]);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
});

// TODO
// carts.put("/carts/:cartsId", async (req, res) => {
//   const data = req.body

//   try {
//     const query = 'UPDATE carts SET'
//     const values =
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ msg: "Failed" });
//   }
// })

carts.delete("/carts/:cartsId", async (req, res) => {
    try {
      const query = "DELETE FROM carts WHERE id = $1";
      const values = [cartsId];
      const cart = await db.query(query, values);
  
      if (!cart) {
        return res.send("No cart with that id.");
      }
  
      res.sendStatus(204);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
});

module.exports = carts