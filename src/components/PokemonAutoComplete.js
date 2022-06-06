import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import axios from 'axios';

function FreeSolo(props) {
  console.log(props)
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {props.pokeDropdown &&
      
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        onChange={props.onPokemonChange}
        value={props.pokemon}
        options={props.pokeDropdown.map((option) => option.name)}
        renderInput={(params) => <TextField {...params} label="name" onChange={props.submitNameHandler}/>}
      />
      }
      
    </Stack>
  );
}

export default FreeSolo