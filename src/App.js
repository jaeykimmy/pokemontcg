import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import { Grid, Paper, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import samplecard from "./images/card.png";
import tcglogo from "./images/tcglogo.png";

import FreeSolo from "./components/PokemonAutoComplete";

function App() {
  const [name, setName] = useState("");
  const [cardData, setCardData] = useState("");
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then((res) => {
        setAllPokemonNames(res.data.results);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const updateSearchTerm = (pokemonName) => {
    setName(pokemonName);
  };

  const searchPokemon = (searchTerm) => {
    setLoading(true);

    axios
      .get(`https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`)
      .then((res) => {
        setCardData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <img className="tcglogo" src={tcglogo} alt="" onClick={refreshPage}></img>
      <div className="App-header">
        <div className="input-button">
          <FreeSolo
            updateSearchTerm={updateSearchTerm}
            pokeData={allPokemonNames}
            loading={loading}
          />
          <Button
            style={{ width: "300px" }}
            variant="contained"
            onClick={() => searchPokemon(name)}
          >
            Search
          </Button>
        </div>
        {!cardData && (
          <>
            <h3>Find prices and high quality images of your favourite cards</h3>
            <img className="sample" src={samplecard} alt=""></img>
          </>
        )}
        {loading && <CircularProgress />}

        {cardData && (
          <Paper className="card-individual">
            <Grid columnSpacing={2}>
              {cardData
                .sort(function (a, b) {
                  return (
                    new Date(a.set.releaseDate).valueOf() -
                    new Date(b.set.releaseDate).valueOf()
                  );
                })
                .reverse()
                .map((card) => (
                  <>
                    {card.tcgplayer && (
                      <Card
                        cardSet={card.set.name}
                        cardNumber={card.number}
                        cardLarge={card.images.large}
                        cardSmall={card.images.small}
                        cardSetIcon={card.set.images.symbol}
                        cardURL={card.tcgplayer.url}
                        cardInfo={card}
                        key={card.id}
                      />
                    )}
                  </>
                ))}
            </Grid>
          </Paper>
        )}
      </div>
    </div>
  );
}

export default App;
