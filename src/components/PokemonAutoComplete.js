import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";

function FreeSolo({ pokeData, updateSearchTerm, loading }) {
  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      {pokeData && (
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          onChange={(_, newValue) => {
            updateSearchTerm(newValue);
          }}
          options={pokeData.map(
            (option) =>
              option.name.charAt(0).toUpperCase() +
              option.name
                .slice(1)
                .replace(/(-[a-z])/g, (match) => match.toUpperCase())
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Enter Card Name"
              onChange={(event) => updateSearchTerm(event.target.value)}
              disabled={loading}
            />
          )}
        />
      )}
    </Stack>
  );
}

export default FreeSolo;
