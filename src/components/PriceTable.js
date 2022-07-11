import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';



export default function BasicTable(props) {
  console.log(props)
  return (
    <TableContainer component={Paper}>
      <Grid item sm={3}>

      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            
            {Object.values(props.cardInfo.tcgplayer.prices).map((x) =>
            Object.keys(x).map((x) => (
            <TableCell variant="head" align="right">{(x.charAt(0).toUpperCase() + x.slice(1))
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
                :</TableCell>
            ))
          )}
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              key={props.cardInfo.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              
              {Object.values(props.cardInfo.tcgplayer.prices).map((x) =>
            Object.values(x).map((x) => <TableCell variant="head" align="right">${x.toFixed(2)}</TableCell>)
          )}
              
              
            </TableRow>
         
        </TableBody>
      </Table>
      </Grid>
    </TableContainer>
  );
}