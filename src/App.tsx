import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./components/Card";
import { Grid, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import tcglogo from "./images/tcglogo.png";
import styled from "styled-components";
import FreeSolo from "./components/PokemonAutoComplete";
import "./components/background.scss";

function App() {
  const Button = styled.button`
    background: black;
    color: white;
    border-radius: 7px;
    padding: 20px;
    margin: 10px;
    font-size: 24px;
    :disabled {
      opacity: 0.4;
    }
    :hover {
      box-shadow: 0 0 10px white;
    }
    z-index: 50;
  `;

  const [name, setName] = useState("");
  const [cardData, setCardData] = useState([]);
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
        <Paper className="searchbox">
          <div className="input-button">
            {cardData.length === 0 && <h2>Pokémon Card Prices and Gallery</h2>}
            <FreeSolo
              updateSearchTerm={updateSearchTerm}
              pokeData={allPokemonNames}
              loading={loading}
              // value={(e) => e.target.value}
            />
            <Button
              style={{ width: "300px" }}
              variant="contained"
              onClick={() => searchPokemon(name)}
            >
              Search
            </Button>
          </div>
          {cardData.length === 0 && (
            <>
              <p>
                Find prices and high quality images <br />
                of your favourite cards
              </p>
              {/* <img className="sample" src={samplecard} alt=""></img> */}
            </>
          )}
          {loading && <CircularProgress />}
        </Paper>

        {cardData && (
          <Grid columnSpacing={2}>
            {cardData
              .sort(function (a: any, b: any) {
                return (
                  new Date(a.set.releaseDate).valueOf() -
                  new Date(b.set.releaseDate).valueOf()
                );
              })
              .reverse()
              .map((card: any | undefined) => (
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
        )}
      </div>
    </div>
  );
}

export default App;
