const express = require('express')
const orders = express.Router()
const db = require('../db/index');

orders.param("orderId", (req, res, next) => {
    const { orderId } = req.params;
    next();
  });

orders.get("/orders", async (req, res) => {
try {
    const orders = await db.query("SELECT * FROM orders");
    return res.status(201).send(orders.rows);
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
}
});

orders.get("/orders/:orderId", async (req, res) => {
    try {
      const query = "SELECT * FROM orders WHERE id = $1";
      const values = [orderId];
      const order = await db.query(query, values);
  
      if (!order) {
        return res.status(404).send("No order with that id");
      }
      res.send(order.rows[0]);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
});

// TODO
// orders.put("/orders/:orderId", async (req, res) => {
//   const data = req.body

//   try {
//     const query = 'UPDATE orders SET'
//     const values =
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ msg: "Failed" });
//   }
// })

orders.delete("/orders/:orderId", async (req, res) => {
    try {
      const query = "DELETE FROM orders WHERE id = $1";
      const values = [orderId];
      const order = await db.query(query, values);
  
      if (!order) {
        return res.send("No order with that id.");
      }
  
      res.sendStatus(204);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
});

module.exports = orders