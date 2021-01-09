import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Snackbars({type, closeSnack}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

 
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    closeSnack()
  };

  return (
    <div className={classes.root}>
      {type === "loginError" &&<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          wrong username or password
        </Alert>
      </Snackbar>}
      {type === "registerError" &&<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          you filled some invalid details
        </Alert>
      </Snackbar>}
      {type === "addVacationError" && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          you added wrong vacation details
        </Alert>
      </Snackbar>}
    </div>
  );
}