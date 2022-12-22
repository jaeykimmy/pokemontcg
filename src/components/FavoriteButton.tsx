import axios from "axios";
import { useState } from "react";
export default function FavoriteButton({ cardInfo }) {
  console.log(cardInfo);
  const [itemId, setItemId] = useState(cardInfo.id);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    axios
      .post("http://localhost:8080/pokemontcg/favorites", {
        item_id: itemId,
        isFavorite: !isFavorite,
      })
      .then((res) => {
        console.log(res.data);
        setIsFavorite(!isFavorite);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <button onClick={handleClick}>
      {isFavorite ? "Remove from favorites" : "Add to favorites"}
    </button>
  );
}
