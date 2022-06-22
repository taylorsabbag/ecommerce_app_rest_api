const express = require('express')
const products = express.Router()
const db = require('../db/index');

products.param("productId", (req, res, next) => {
    const { productId } = req.params;
    next();
  });

products.get("/products", async (req, res) => {
try {
    const products = await db.query("SELECT * FROM products");
    return res.status(201).send(products.rows);
} catch (err) {
    console.log(err.stack);
    res.status(500).json({ msg: "Failed" });
}
});

products.get("/products/:productId", async (req, res) => {
    try {
      const query = "SELECT * FROM products WHERE id = $1";
      const values = [productId];
      const product = await db.query(query, values);
  
      if (!product) {
        return res.status(404).send("No product with that id");
      }
      res.send(product.rows[0]);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
});

// TODO
// products.put("/products/:productId", async (req, res) => {
//   const data = req.body

//   try {
//     const query = 'UPDATE products SET'
//     const values =
//   } catch (err) {
//     console.log(err.stack);
//     res.status(500).json({ msg: "Failed" });
//   }
// })

products.delete("/products/:productId", async (req, res) => {
    try {
      const query = "DELETE FROM products WHERE id = $1";
      const values = [productId];
      const product = await db.query(query, values);
  
      if (!product) {
        return res.send("No product with that id.");
      }
  
      res.sendStatus(204);
    } catch (err) {
      console.log(err.stack);
      res.status(500).json({ msg: "Failed" });
    }
});

module.exports = products