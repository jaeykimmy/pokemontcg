
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

  const refreshPage = () => {
    window.location.reload();
  }

  console.log(cardData)
  return (
    <div className="App">
      <img className='tcglogo' src='./tcglogo.png' alt=''onClick={refreshPage}></img>
      <div className='App-header'>
        <div className="input-button">
        <TextField id="outlined-basic" label="Enter Pokemon" variant="outlined" onChange={submitNameHandler}/>
          <Button
            style={{width: '200px'}}
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
