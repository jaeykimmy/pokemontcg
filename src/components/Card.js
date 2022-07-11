import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import './Card.css'
import { Grid } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log(props)
  return (
    <div className='card'>
      <Button onClick={handleOpen} className='icon-button'>
        <img className="card-small"src={props.cardSmall} alt=''></img>
      </Button>
      <div className='icon-set'>
        <img className='icon'
          src={props.cardSetIcon}
          alt=''></img>
        {props.cardSet} #{props.cardNumber}
        {props.cardInfo.tcgplayer && Object.keys(props.cardInfo.tcgplayer.prices).map(x => <p>{x}</p>)}
        {props.cardInfo.tcgplayer && Object.values(props.cardInfo.tcgplayer.prices).map(x => (Object.values(x).map(x => <p>{x}</p>)))}
        {props.cardInfo.tcgplayer && Object.values(props.cardInfo.tcgplayer.prices).map(x => (Object.keys(x).map(x => <p>{x}</p>)))}

      </div>
<Button variant="contained" href={props.cardURL} target="_blank">TCGPlayer Price</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img className='card-large' src={props.cardLarge} alt=''></img>
        </Box>
      </Modal>
    </div>
  );
}