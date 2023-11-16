import { useEffect, useState } from "react";
import axios from "axios";
import "./favorites.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
export default function Favorites() {
  const [data, setData] = useState([]);

  const handleClick = (itemId) => {
    // Define the URL for updating the item
    const apiUrl = `http://localhost:8080/pokemontcg/favorites/`; // Replace `itemId` with the actual item's ID

    // Define the data to be sent for the update
    const requestBody = {
      isFavorite: false,
      item_id: itemId,
    };

    // Send a PUT or PATCH request to update the item
    axios
      .post(apiUrl, requestBody) // Use PUT or PATCH depending on your API
      .then((res) => {
        setData(data.filter((item) => item.item_id !== itemId));
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8080/pokemontcg/favorites`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch(() => {
        console.error("error");
      });
  }, []);

  return (
    <div className="favorites" style={{ marginTop: "100px" }}>
      <div className="total">
        {" "}
        Your Collection is Worth: $
        {data
          .reduce((total, item) => {
            return total + Number(item.price);
          }, 0)
          .toFixed(2)}
      </div>
      <div className="card-info">
        {data.map((x) => (
          <div className="card-info-each">
            <img className="card-photo-favorites" src={x.image} alt=""></img>
            <p>$ {Number(x.price).toFixed(2)}</p>
            <IconButton onClick={() => handleClick(x.item_id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}
