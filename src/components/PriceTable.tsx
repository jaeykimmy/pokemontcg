import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Grid } from "@mui/material";
import "./PriceTable.scss";
import { CardData } from "./Home";

export default function BasicTable(props: CardData) {
  console.log(props);
  // went with turn object into array solution due to difference in key names and length of keys
  const priceLabels = Object.keys(
    Object.values(props.cardInfo.tcgplayer.prices)[0]
  );
  const priceNormal = Object.values(
    Object.values(props.cardInfo.tcgplayer.prices)[0]
  );

  return (
    <TableContainer component={Paper} className="priceTable">
      <Grid item sm={12}>
        <Table
          sx={{ minWidth: 300 }}
          aria-label="simple table"
          key={props.cardInfo.id}
        >
          <TableBody>
            <TableRow>
              {priceLabels.map((x) => (
                <TableCell className="price-text" variant="head" align="right">
                  {x.charAt(0).toUpperCase() +
                    x
                      .slice(1)
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                </TableCell>
              ))}
            </TableRow>

            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {priceNormal.map((x: any) => (
                <TableCell
                  className="price-dollar"
                  variant="head"
                  align="right"
                >
                  ${x?.toFixed(2)}
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      {/* if there is a special variant of the card, then render a price table for that as well */}
      {Object.values(props.cardInfo.tcgplayer.prices)[1] && (
        <Grid item sm={12}>
          <Table
            sx={{ minWidth: 300 }}
            aria-label="simple table"
            key={props.cardInfo.id}
          >
            <TableBody>
              <TableRow>
                {Object.keys(
                  Object.values(props.cardInfo.tcgplayer.prices)[1]
                ).map((x) => (
                  <TableCell
                    variant="head"
                    align="right"
                    className="price-text"
                  >
                    {x.charAt(0).toUpperCase() +
                      x
                        .slice(1)
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.values(
                  Object.values(props.cardInfo.tcgplayer.prices)[1]
                ).map((x: any) => (
                  <TableCell
                    className="price-dollar"
                    variant="head"
                    align="right"
                  >
                    ${x?.toFixed(2)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      )}
    </TableContainer>
  );
}
