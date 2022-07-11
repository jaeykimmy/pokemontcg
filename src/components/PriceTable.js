import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";

export default function BasicTable(props) {
  const priceLabels = Object.keys(
    Object.values(props.cardInfo.tcgplayer.prices)[0]
  );
  const priceNormal = Object.values(
    Object.values(props.cardInfo.tcgplayer.prices)[0]
  );
  const priceRare = Object.values(props.cardInfo.tcgplayer.prices)[1];
  return (
    <TableContainer component={Paper}>
      {/* {Object.keys(Object.values(props.cardInfo.tcgplayer.prices)[0]).map((x) => <p>{x}</p>)}
      {Object.values(Object.values(props.cardInfo.tcgplayer.prices)[0]).map((x) => <p>{x}</p>)}
      {Object.values(props.cardInfo.tcgplayer.prices)[1] && Object.values(Object.values(props.cardInfo.tcgplayer.prices)[1]).map((x) => <p>{x}</p>)}
       */}

      <Grid item sm={12}>
        <Table
          sx={{ minWidth: 360 }}
          aria-label="simple table"
          key={props.cardInfo.id}
        >
          <TableBody>
            <TableRow>
              {priceLabels.map((x) => (
                <TableCell variant="head" align="right">
                  {x}
                </TableCell>
              ))}
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {priceNormal.map((x) => (
                <TableCell variant="head" align="right">
                  ${x.toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      
    </TableContainer>
  );
}
