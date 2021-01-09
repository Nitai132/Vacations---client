import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';


export default function FormDialog({vacation, editVacation, inputValueChanged}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (flag) => {
    if (flag === 1 ) {
      editVacation()
    }
    setOpen(false);
  };

  const editButtonStyle = {
    position: 'relative', 
    left: '100px',
    top: '30px'
  }


  return (
    <Fragment>
      <Button onClick={handleClickOpen} style={editButtonStyle}>
            <EditIcon />     
        </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">EDIT VACATION FORM</DialogTitle>
        <DialogContent>
          <DialogContentText>
            change the form inputs to edit this vacation details
          </DialogContentText>
          <TextField
                autoFocus
                margin="dense"
                id="destination"
                label="Destination"
                type="text"
                fullWidth
                defaultValue={vacation.destination}
                onChange={({target: {value}})=> inputValueChanged(value, 'destination')}
            />
            <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                defaultValue={vacation.description}
                onChange={({target: {value}})=> inputValueChanged(value, 'description')}
            />
            <TextField
                autoFocus
                margin="dense"
                id="image"
                label="Image(url)"
                type="text"
                defaultValue={vacation.image}
                fullWidth
                onChange={({target: {value}})=> inputValueChanged(value, 'image')}
            />
            <TextField
                autoFocus
                margin="dense"
                id="fromDate"
                label="From Date"
                type="datetime-local"
                defaultValue={vacation.fromDate.replace(/\.\d+/, "").replace(':00Z', "")}
                fullWidth
                onChange={({target: {value}})=> inputValueChanged(value, 'fromDate')}
            />
            <TextField
                autoFocus
                margin="dense"
                id="untilDate"
                label="Until Date"
                type="text"
                type="datetime-local"
                defaultValue={vacation.untilDate.replace(/\.\d+/, "").replace(':00Z', "")}
                onChange={({target: {value}})=> inputValueChanged(value, 'untilDate')}

                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Price"
                type="text"
                fullWidth
                defaultValue={vacation.price}
                onChange={({target: {value}})=> inputValueChanged(value, 'price')}
            /> 
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> handleClose(0)} color="secondary">
            Cancel
          </Button>
          <Button onClick={()=> handleClose(1)} color="primary">
            edit Details
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}