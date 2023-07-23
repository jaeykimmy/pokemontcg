import axios from "axios";
import { useState } from "react";
export default function FavoriteButton({ cardInfo }) {
  // console.log(Object.values(cardInfo.tcgplayer.prices)[0]["market"]);

  const [itemId, setItemId] = useState(cardInfo.id);
  const [image, setImage] = useState(cardInfo.images.small);

  const marketPrice =
    cardInfo.tcgplayer.prices &&
    Object.values(cardInfo?.tcgplayer?.prices)[0]["market"];
  const [price, setPrice] = useState(marketPrice || 0);

  const [isFavorite, setIsFavorite] = useState(false);

  const handleClick = () => {
    axios
      .post("http://localhost:8080/pokemontcg/favorites", {
        price: price,
        item_id: itemId,
        isFavorite: !isFavorite,
        image: image,
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
