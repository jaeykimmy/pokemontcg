const express = require("express");
const { Client } = require("pg");

const app = express();

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

app.get("/favorites", (req, res) => {
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

// export function addFavorite(itemId) {
//   client.query(
//     "INSERT INTO favorites (item_id, is_favorite) VALUES ($1, true)",
//     [itemId],
//     (err, res) => {
//       if (err) {
//         console.error("Error executing query:", err.stack);
//       } else {
//         console.log("Query completed successfully.");
//       }
//     }
//   );
// }

const port = 8080;

app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});
