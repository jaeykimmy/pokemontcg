import { useEffect, useState } from "react";
import axios from "axios";
import "./favorites.scss";
export default function Favorites() {
  const [data, setData] = useState([]);
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
    <div className="favorites">
      <div className="total">
        {" "}
        Your Collection is Worth: $
        {data.reduce((total, item) => {
          return total + Number(item.price);
        }, 0)}
      </div>
      <div className="card-info">
        {data.map((x) => (
          <div className="card-info-each">
            <img className="card-photo-favorites" src={x.image} alt=""></img>
            <p>$ {x.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
