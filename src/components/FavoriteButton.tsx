import axios from "axios";
import { useState } from "react";
export default function FavoriteButton({ cardInfo }) {
  console.log(Object.values(cardInfo.tcgplayer.prices)[0]["market"]);
  const [itemId, setItemId] = useState(cardInfo.id);
  const [price, setPrice] = useState(
    Object.values(cardInfo.tcgplayer.prices)[0]["market"]
  );

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    axios
      .post("http://localhost:8080/pokemontcg/favorites", {
        price: price,
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
