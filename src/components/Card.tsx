import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import "./Card.scss";
import PriceTable from "./PriceTable";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(props);
  return (
    <div className="card">
      <Button onClick={handleOpen} className="icon-button">
        <img className="card-small" src={props.cardLarge} alt=""></img>
      </Button>
      <div className="icon-set" style={{ color: "white" }}>
        <img className="icon" src={props.cardSetIcon} alt=""></img>
        {props.cardSet} #{props.cardNumber}
      </div>

      {/* <div className="prices">
        <div>

          {Object.values(props.cardInfo.tcgplayer.prices).map((x) =>
            Object.keys(x).map((x) => (
              <p>
                {(x.charAt(0).toUpperCase() + x.slice(1))
                  .replace(/([A-Z])/g, " $1")
                  .trim()}
                :
              </p>
            ))
          )}
        </div>
        <div>
          {Object.values(props.cardInfo.tcgplayer.prices).map((x) =>
            Object.values(x).map((x) => <p>${x}</p>)
          )}
        </div>
      </div> */}
      <Button variant="contained" href={props.cardURL} target="_blank">
        TCGPlayer Price
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box sx={style} style={{ color: "black", textAlign: "center" }}>
          {/* <img className="card-large" src={props.cardLarge} alt=""></img> */}
          <b>{props.cardInfo.name}</b>
          <br />
          Set: {props.cardInfo.set.name} <br />
          Artist: {props.cardInfo.artist}
          <br />
          Release Date: {props.cardInfo.set.releaseDate}
          <br />
          Price on TCGPlayer:
          {props.cardInfo.tcgplayer.prices && (
            <PriceTable
              cardInfo={props.cardInfo}
              tcgplayer={{
                url: "",
                prices: undefined,
              }}
              set={{
                name: "",
                images: {
                  symbol: "",
                },
                releaseDate: "",
              }}
              number={0}
              images={{
                small: "",
                large: "",
              }}
              id={""}
            />
          )}
        </Box>
      </Modal>
    </div>
  );
}
