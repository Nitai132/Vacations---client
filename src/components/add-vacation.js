import React from 'react';
import {connect} from 'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import _ from 'lodash'
import Spinner from './spinner';



const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

const datePickerStyle = {
    width: '400px'
}

class AddVacation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            description: '',
            destination: '',
            image: '',
            fromDate: '',
            untilDate: '',
            price: '',
            destinationError: false,
            destinationErrorText: '',
            priceError: false,
            priceErrorText: '',
            descriptionError: false,
            descriptionErrorText: ''
        };
    };

    render() {
        if (this.props.pending === true) {
            return (
                <div>
                    <Spinner timer={40}/>
                </div>
            )
        }
        return (
            <div>            
                {this.props.isAdmin === 1 && <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className="paper" style={paperStyle}>
                <h3>Hello Admin, on this page you can easily add new vacations by filling this form</h3>
                    <Avatar className="avatar">
                    <AssignmentIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Add a new Vacation
                    </Typography>
                    <form className="form" noValidate action="/">
                        <TextField
                            error={this.state.destinationError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Destination"
                            label="Destination"
                            name="Destination"
                            helperText={this.state.destinationErrorText}
                            onChange={({target: {value}})=> this.onChange(value, 'destination')}
                            onKeyUp={({target: {value}})=> this.checkValidation(value, 'destinationError')}
                        />
                        <TextField
                            error={this.state.descriptionError}
                            multiline="true"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Description"
                            label="Description"
                            name="Description"
                            helperText={this.state.descriptionErrorText}
                            onChange={({target: {value}})=> this.onChange(value, 'description')}
                            onKeyUp={({target: {value}})=> this.checkValidation(value, 'descriptionError')}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="image"
                            label="Image (URL)"
                            name="image"
                            onChange={({target: {value}})=> this.onChange(value, 'image')}
                        />
                        <TextField
                            error={this.state.priceError}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            label="Price"
                            id="price"
                            helperText={this.state.priceErrorText}
                            onChange={({target: {value}})=> this.onChange(value, 'price')}
                            onKeyUp={({target: {value}})=> this.checkValidation(value, 'priceError')}
                        />
                        <TextField
                            style={datePickerStyle}
                            id="datetime-local"
                            label="vacation starting date"
                            type="datetime-local"
                            defaultValue="2020-06-24T10:30"
                            name="from"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={({target: {value}})=> this.onChange(value, 'fromDate')}
                        />
                        <TextField
                            style={datePickerStyle}
                            id="datetime-local"
                            label="vacation return  date"
                            type="datetime-local"
                            defaultValue="2020-06-24T10:30"
                            name="until"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            onChange={({target: {value}})=> this.onChange(value, 'untilDate')}
                        />
                        <br />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                            onClick={()=> this.onClick()}
                        >
                            Add Vacation
                        </Button>
                        <br />
                        <br />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="error"
                            className="submit"
                        >
                            return to main page
                        </Button>  
                    </form>
                </div>
                <br />
                </Container>}
                {this.props.isAdmin === 0 && 
                this.props.history.push('/')}
            </div>
        )
    };



    onChange(value, field) {
        this.setState({[field]: value});
    };

    async onClick() {
        try {
           await axios.post('/addVacation', this.state);
        }catch(err) {
            console.log(err);
        };
    };
    // (שאלת בונוס)
    async checkValidation(value, field) {
        var pattern = /^([^0-9]*)$/;
        if(field === 'destinationError' && !value.match(pattern)) {
            this.setState({[field]: true, destinationErrorText: "Destination may not contain numbers"});
        }
        else if(field === 'destinationError' && value.match(pattern)) {
            this.setState({[field]: false, destinationErrorText: ''});
        } 
        
        else if(field === 'priceError' && isNaN(Number(value))) {
            this.setState({[field]: true, priceErrorText: "price may not contain letters"});
        }
        else if(field === 'priceError' && !isNaN(Number(value))) {
            this.setState({[field]: false, priceErrorText: ''});
        }

        else if(field === 'descriptionError' && value.length > 200 || value.length < 100) {
            this.setState({[field]: true, descriptionErrorText: "description should contain between 100 to 200 letters (use Enter key to go down rows)"})
        }
        else if(field === 'descriptionError' && value.length < 200 || value.length > 100) {
            this.setState({[field]: false, descriptionErrorText: ''})
        }
    }

      
}

const mapStateToProps = state => {
    return {
        isAdmin: state.userDetails.isAdmin,
        pending: state.userDetails.pending
    }
}


export default connect(mapStateToProps, null)(AddVacation)