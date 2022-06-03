import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import axios from 'axios';

function FreeSolo(props) {
  const [pokeData, setPokeData] = useState('')

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
      .then(res => {
        setPokeData(res.data.results)
      })
  },[])
  
  console.log(pokeData)

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {pokeData &&
      
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        
        options={pokeData.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} label="name" onChange={props.submitNameHandler}/>}
      />
      }
      
    </Stack>
  );
}

export default FreeSolo