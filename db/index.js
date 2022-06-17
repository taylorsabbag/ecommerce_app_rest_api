const { Pool, Client } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "postgres",
  port: "5432",
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "ecommerce",
  password: "postgres",
  port: "5432",
});
await client.connect()
const res = await client.query('SELECT NOW()')
await client.end()

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
