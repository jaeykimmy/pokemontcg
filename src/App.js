
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import { Grid, Paper, TextField, Button } from '@mui/material';
import FreeSolo from './components/PokemonAutoComplete';

function App() {
  const [name, setName] = useState('')
  const [cardData, setCardData] = useState('')
  const [pokeDropdown, setPokeDropdown] = useState('')
  const [pokemon, setPokemon] = useState('')

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then(res => {
        setPokeDropdown(res.data.results)
      })
  }, [])
  
  const onPokemonChange = (e, v) => {
    setPokemon(v)
  }
  
  // console.log(pokeData)
  console.log(pokemon)
  console.log("cardData", cardData)

  const submitNameHandler = (event) => {
    setName(event.target.value)
    console.log("targetvalue:", event.target.value)
  }

  const searchPokemon = () => {
    axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${name}`)
      .then(res => {
        setCardData(res.data.data)
    })
  }

  const refreshPage = () => {
    window.location.reload();
  }

  console.log(cardData)
  console.log(name)
  return (
    <div className="App">
      <img className='tcglogo' src='./tcglogo.png' alt=''onClick={refreshPage}></img>
      <div className='App-header'>
        <div className="input-button">
          <FreeSolo submitNameHandler={submitNameHandler}
            onPokemonChange={onPokemonChange}
            pokeDropdown={pokeDropdown}
            pokemon={pokemon}
            name={name}/>
            
          {/* <TextField
            style={{ width: '200px' }}
            id="outlined-basic" label="Enter Pokemon" variant="outlined" onChange={submitNameHandler} /> */}
          <Button
            style={{width: '300px'}}
            variant="contained"
            onClick={searchPokemon}>Search</Button>
        </div>
        {!cardData && 
          <>
          <h3>Find prices and high quality images of your favourite cards</h3>
        <img className="sample" src='./card.png' alt=""></img>
          </>
        }
        {cardData &&
          <Paper className="card-individual">
            <Grid columnSpacing={2}>
            {cardData.map((card) => (
              <>
              {card.tcgplayer &&
                  <Card
                    cardSet={card.set.name}
                    cardNumber={card.number}
                    cardLarge={card.images.large}
                    cardSmall={card.images.small}
                    cardSetIcon={card.set.images.symbol}
                    cardURL={card.tcgplayer.url}
                    /> 
                  }
                  </>
          ))}
            </Grid>
        </Paper>
        }
      </div>
    </div>
  );
}

export default App;
