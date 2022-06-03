import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function FreeSolo({ pokeData, updateSearchTerm, loading }) {
  return (
    <div style={{width: 300}}>
      {pokeData &&
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          onChange={(_, newValue) => { updateSearchTerm(newValue)}}
          options={pokeData.map((option) => option.name)}
          renderInput={(params) => <TextField {...params} label="name" onChange={(event) => updateSearchTerm(event.target.value)} />}
          disabled={loading}
        />
      }
    </div>
  );
}

export default FreeSolo