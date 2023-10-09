import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AvisoMui({openAviso, setOpenAviso,  avisoMessage}) {

  const handleClick = () => {
    setOpenAviso(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAviso(false);
  };

  return (
   
      <Snackbar anchorOrigin={{vertical:'bottom',horizontal:'center'}}  open={openAviso} autoHideDuration={2000} onClose={handleClose}>
        <Alert  onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
          {avisoMessage}
        </Alert>
      </Snackbar>
 
  );
}
