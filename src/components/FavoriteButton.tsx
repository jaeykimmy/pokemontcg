import axios from "axios";
import { useState, useEffect } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
export default function FavoriteButton({ cardInfo, favourites }) {
  const [data, setData] = useState([]);
  console.log(favourites);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/pokemontcg/favorites`)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  }, []);
  console.log(cardInfo);
  console.log(data);
  const [itemId, setItemId] = useState(cardInfo.id);
  const [image, setImage] = useState(cardInfo.images.small);

  const marketPrice =
    cardInfo.tcgplayer.prices &&
    Object.values(cardInfo?.tcgplayer?.prices)[0]["market"];
  const [price, setPrice] = useState(marketPrice || 0);

  const isAFavItem = favourites?.reduce((result, item) => {
    if (item.item_id === cardInfo.id) {
      result = true;
    }
    return result;
  }, false);

  // let isAFavItem = false;
  // favourites.forEach((item) => {
  //   if (item.item_id === cardInfo.id) {
  //     isAFavItem = true;
  //   }
  // });

  const [isFavorite, setIsFavorite] = useState(isAFavItem);
  const handleDelete = (itemId) => {
    // Define the URL for deleting the specific item based on its ID
    const apiUrl = `http://localhost:8080/pokemontcg/favorites/`;
    const requestData = {
      price: price,
      item_id: itemId,
      isFavorite: false,
      image: image,
    };
    // Send a DELETE request to remove the item from favorites
    axios
      .post(apiUrl, requestData)
      .then((res) => {
        console.log(`Item ${itemId} removed from favorites`);
        setIsFavorite(false); // Since it's removed, update the state
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClick = () => {
    // Toggle the current favorite state
    const newFavoriteState = !isFavorite;

    if (newFavoriteState) {
      // Define the URL and data for adding to favorites
      const apiUrl = "http://localhost:8080/pokemontcg/favorites";
      const requestData = {
        price: price,
        item_id: itemId,
        isFavorite: true,
        image: image,
      };

      // Send a POST request to add to favorites
      axios
        .post(apiUrl, requestData)
        .then((res) => {
          console.log(`Item ${itemId} added to favorites`);
          setIsFavorite(true); // Update the state
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // If it's not a favorite, call the handleDelete function
      handleDelete(itemId);
    }
  };
  // const handleClick = () => {
  //   // Check the current favorite state
  //   const newFavoriteState = !isFavorite;

  //   // Define the URL and data based on the current favorite state
  //   const apiUrl = "http://localhost:8080/pokemontcg/favorites";
  //   const requestData = {
  //     price: price,
  //     item_id: itemId,
  //     isFavorite: newFavoriteState,
  //     image: image,
  //   };

  //   // Send a POST request to add or remove from favorites
  //   axios
  //     .post(apiUrl, requestData)
  //     .then((res) => {
  //       console.log(res.data);
  //       setIsFavorite(newFavoriteState); // Update the state
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  return (
    <IconButton onClick={handleClick}>
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "white" }} />
      ) : (
        <FavoriteBorderIcon sx={{ color: "white" }} />
      )}
    </IconButton>
  );
}
