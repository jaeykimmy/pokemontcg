
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('')
  const [cardInfo, setCardInfo] = useState('')

  const submitNameHandler = (event) => {
    setName(event.target.value)
  }

  const searchPokemon = () => {
    axios.get(`https://api.pokemontcg.io/v2/cards?q=name:${name}`)
      .then(res => {
        setCardInfo(res.data.data)
    })
  }
  // console.log(cardInfo)
  return (
    <div className="App">
      Pokemon TCG
      <div className='App-header'>
      <input onChange={submitNameHandler}></input>
        <button onClick={searchPokemon}>Search</button>
        {cardInfo &&
        <div>
          {cardInfo.map((card) => (
            <img src={card.images.small} alt=''></img>
          ))}
        </div>
        }
      </div>
    </div>
  );
}

export default App;
