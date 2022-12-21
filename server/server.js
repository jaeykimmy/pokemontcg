const { Client } = require("pg");

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
