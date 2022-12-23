import { useEffect, useState } from "react";
import axios from "axios";
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
    <div>
      {data.map((x) => (
        <>
          <img src={x.image} alt=""></img>
        </>
      ))}
      <div>
        {" "}
        Total Value of your Collection: $
        {data.reduce((total, item) => {
          return total + Number(item.price);
        }, 0)}
      </div>
    </div>
  );
}
