import "../App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import { Grid, Paper, TextField, Autocomplete, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import tcglogo from "../images/tcglogo.png";
import styled from "styled-components";
import FreeSolo from "./PokemonAutoComplete";
import "./home.scss";
import "../components/background.scss";

export interface CardData {
  cardInfo: {
    id: number;
    tcgplayer: {
      url: string;
      prices: number;
    };
    name: string;
    set: {
      name: string;
      releaseDate: string;
    };
    artist: string;
  };
  cardURL: string;
  cardLarge: string;
  cardSetIcon: string;
  cardSet: string;
  cardNumber: number;
  tcgplayer: {
    url: string;
    prices: any;
  };
  set: {
    name: string;
    images: {
      symbol: string;
    };
    releaseDate: string;
  };
  number: number;
  images: {
    small: string;
    large: string;
  };
  id: string;
}
const StyledButton = styled.button`
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

function Home() {
  const [name, setName] = useState("");
  const [set, setSet] = useState({});
  const [cardData, setCardData] = useState([]);
  const [setData, setSetData] = useState([]);
  const [allSetNames, setAllSetNames] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cardSearchTrue, setCardSearchTrue] = useState(true);

  const config = {
    headers: {
      "X-Api-Key": process.env.REACT_APP_MY_API_KEY,
    },
  };
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

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.pokemontcg.io/v2/sets`)
      .then((res) => {
        setAllSetNames(res.data.data.reverse());
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  // console.log(allSetNames);
  const newSetNames = allSetNames.map((x) => {
    return { label: x["id"], name: x["name"] };
  });

  // console.log(newSetNames);

  const updateSearchTerm = (pokemonName: string) => {
    setName(pokemonName);
  };

  const searchPokemon = (searchTerm: string) => {
    setLoading(true);

    axios
      .get(`https://api.pokemontcg.io/v2/cards?q=name:${searchTerm}`, config)
      .then((res) => {
        setCardData(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const searchSet = async (searchTerm) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.pokemontcg.io/v2/cards?q=set.id:${searchTerm}&orderBy=tcgplayer.prices.holofoil.market`,
        config
      );
      setSetData(res.data.data.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearChangeIntoSetSearch = () => {
    setCardSearchTrue(false);
    setCardData([]);
  };
  const clearChangeIntoCardSearch = () => {
    setCardSearchTrue(true);
    setSetData([]);
  };
  const refreshPage = () => {
    window.location.reload();
  };
  // console.log(cardData);

  return (
    <div className="App">
      <div className="App-header">
        <Paper className="searchbox">
          <div className="input-button">
            {cardData.length === 0 && <h2>Pokémon Card Prices and Gallery</h2>}
            {cardSearchTrue === true && (
              <>
                <FreeSolo
                  updateSearchTerm={updateSearchTerm}
                  pokeData={allPokemonNames}
                  loading={loading}
                  // value={(e) => e.target.value}
                />
                <StyledButton
                  style={{ width: "300px" }}
                  // variant="contained"
                  onClick={() => searchPokemon(name)}
                >
                  Card Search
                </StyledButton>
                <Button onClick={clearChangeIntoSetSearch}>
                  Search Set Instead
                </Button>
              </>
            )}
            {/* <TextField onChange={(e) => setSet(e.target.value)}></TextField> */}
            {cardSearchTrue === false && (
              <>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={newSetNames}
                  sx={{ width: 300 }}
                  onChange={(event, newValue: any) => setSet(newValue.label)}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField {...params} label="Set" />
                  )}
                />
                <StyledButton
                  onClick={() => searchSet(set)}
                  style={{ width: "300px" }}
                >
                  Set Search
                </StyledButton>
                <Button onClick={clearChangeIntoCardSearch}>
                  Search Card Instead
                </Button>
              </>
            )}
          </div>
          {/* this is for when there is no data yet */}
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
        {/* if there is data, organize info like so */}
        {cardData && (
          <Grid columnSpacing={2}>
            {cardData
              .sort(function (a: CardData, b: CardData) {
                return (
                  new Date(a.set.releaseDate).valueOf() -
                  new Date(b.set.releaseDate).valueOf()
                );
              })
              .reverse()

              .map((card: CardData) => (
                <>
                  {card.tcgplayer && (
                    <>
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
                    </>
                  )}
                </>
              ))}
          </Grid>
        )}
        {setData && (
          <Grid columnSpacing={2}>
            {setData
              .sort(function (a: CardData, b: CardData) {
                return (
                  new Date(a.set.releaseDate).valueOf() -
                  new Date(b.set.releaseDate).valueOf()
                );
              })

              .map((card: CardData) => (
                <>
                  {card.tcgplayer && (
                    <>
                      <Card
                        cardSet={card.set.name}
                        cardNumber={card.number}
                        cardLarge={card.images.large}
                        cardSmall={card.images.small}
                        cardSetIcon={card.set.images.symbol}
                        cardURL={card.tcgplayer.url}
                        cardInfo={card}
                        key={card.tcgplayer.url}
                      />
                    </>
                  )}
                </>
              ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

export default Home;
