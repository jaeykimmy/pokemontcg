import { Client } from "pg";
import { useState } from "react";
const client = new Client({
  user: "your_username",
  host: "localhost",
  database: "your_database",
  password: "your_password",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the database.");
  }
});

export function FavoriteButton(): JSX.Element {
  const [itemId, setItemId] = useState<number | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  function handleClick(): void {
    client.query(
      "INSERT INTO favorites (item_id, is_favorite) VALUES ($1, $2) ON CONFLICT (item_id) DO UPDATE SET is_favorite = $2",
      [itemId, !isFavorite],
      (err, res) => {
        if (err) {
          console.error("Error executing query:", err.stack);
        } else {
          setIsFavorite(!isFavorite);
          console.log("Query completed successfully.");
        }
      }
    );
  }

  return (
    <button onClick={handleClick}>
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
}
