import React, { useState } from 'react';
import MuiAlert from '@mui/material/Alert';
import { AlertProps } from 'react-bootstrap';
import { Snackbar } from '@mui/material';




const Alert = React.forwardRef<HTMLDivElement, any>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

interface popup{
  open:boolean
  message:string
  handelClose: any
}
const ErrPopup = ({open, message, handelClose}: popup) => {
  

  return <>
          <Snackbar open={open} autoHideDuration={6000} onClose={handelClose}>
                <Alert onClose={handelClose} severity="error" sx={{ width: '100%' }}>
                  {message}
                </Alert>
            </Snackbar>
    </>;
};

export default ErrPopup;
