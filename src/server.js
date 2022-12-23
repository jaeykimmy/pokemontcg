const express = require("express");
const { Client } = require("pg");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
const client = new Client({
  user: "jaeyoung",
  host: "localhost",
  database: "favorites",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database.");
  }
});

app.get("/pokemontcg/favorites", (req, res) => {
  client.query("SELECT * FROM favorites", (err, result) => {
    if (err) {
      console.log("error");
      console.error("Error executing query:", err.stack);
      res.status(500).send("Error fetching items");
    } else {
      res.json(result.rows);
    }
  });
});

app.post("/pokemontcg/favorites", (req, res) => {
  const item_id = req.body.item_id;
  const isFavorite = req.body.isFavorite;
  const price = req.body.price;
  const image = req.body.image;

  console.log(req.body);
  console.log(item_id, isFavorite);
  res.header("Access-Control-Allow-Origin", "*");
  if (isFavorite) {
    // If the item is a favorite, insert it into the table
    client.query(
      `INSERT INTO favorites (item_id, is_favorite, price, image) VALUES ($1, $2, $3, $4)`,
      [item_id, isFavorite, price, image],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          res.status(500).send("Error saving favorite");
        } else {
          res.send("Favorite saved");
        }
      }
    );
  } else {
    // If the item is not a favorite, delete it from the table
    client.query(
      `DELETE FROM favorites WHERE item_id = $1`,
      [item_id],
      (err, result) => {
        if (err) {
          console.error("Error executing query:", err.stack);
          res.status(500).send("Error deleting favorite");
        } else {
          res.send("Favorite deleted");
        }
      }
    );
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
