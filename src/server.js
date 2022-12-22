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

  console.log(req.body);
  console.log(item_id, isFavorite);
  res.header("Access-Control-Allow-Origin", "*");
  client.query(
    `INSERT INTO favorites (item_id, is_favorite, price) VALUES ($1, $2, $3) ON CONFLICT (item_id) DO UPDATE SET is_favorite = $2`,
    [item_id, isFavorite, price],
    (err, result) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).send("Error saving favorite");
      } else {
        res.send("Favorite saved");
      }
    }
  );
});

const port = 8080;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
