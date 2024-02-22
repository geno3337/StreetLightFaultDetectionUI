import React from "react";
import AdminModal from "../adminModel/adminModel";
import Mycomponent from "../locationMap/mycomponent";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const style = {
    position: 'absolute',
  // position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 750,
  bgcolor: 'background.paper',
  //   border: '2px solid #000',
  boxShadow: 24,
  p:5
};

export default function MapModel(props){
    return(
        <Modal
        {...props}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <IconButton aria-label="delete" onClick={props.onClose} sx={{ position: "absolute", top: 8, right: 10 }} >
                <CloseIcon  fontSize='medium'  />
            </IconButton>
            <Mycomponent location={props?.location}/>
        </Box>
    </Modal>
    )
}