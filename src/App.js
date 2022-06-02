
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import Card from './components/Card';
import { Grid, Paper, TextField, Button } from '@mui/material';

function App() {
  const [name, setName] = useState('')
  const [cardData, setCardData] = useState('')

  const submitNameHandler = (event) => {
    setName(event.target.value)
  }

  const searchPokemon = () => {
    axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${name}`)
      .then(res => {
        setCardData(res.data.data)
    })
  }
  console.log(cardData)
  return (
    <div className="App">
      <h1>Pokemon TCG Gallery</h1>
      <div className='App-header'>
        <div className="input-button">
        <TextField id="outlined-basic" label="Enter Pokemon" variant="outlined" onChange={submitNameHandler}/>
        <Button variant="contained" onClick={searchPokemon}>Search</Button>
        </div>
        {cardData &&
              <Paper className="card-individual">
            {cardData.map((card) => (
                <Grid>
                {/* Older Mcdonalds set have no card url for tcgplayer */}
              {card.tcgplayer &&
              <>
                  <Card
                    cardSet={card.set.name}
                    cardNumber={card.number}
                    cardLarge={card.images.large}
                    cardSmall={card.images.small}
                    cardSetIcon={card.set.images.symbol}
                    cardURL={card.tcgplayer.url}
                    /> 
          </>
                  }
              </Grid>
          ))}
        </Paper>
        }
      </div>
    </div>
  );
}

export default App;
