const express = require("express");
const app = express();

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)
const authRouter = require('./routes/auth')
app.use(['/login', '/register'], authRouter)
const productsRouter = require('./routes/products')
app.use('/products', productsRouter)

const PORT = process.env.port || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
