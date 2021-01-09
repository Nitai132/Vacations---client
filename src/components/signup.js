import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import Snackbars from './snackbars'
import _ from 'lodash';

 const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

export default class Signup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            first: '',
            last: '',
            username: '',
            password: '',
            confirmpass: '',
            firstNameError: false,
            firstNameText: '',
            lastNameError: false,
            lastNameText: '',
            passwordError: false,
            passwordTextError: '',
            userNameError: false,
            userNameTextError: '',
            snackBarError: false,
        };
    };

    render() {
        return (
            <div>
                <h3>please fill the right details in order to sign up</h3>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className="paper" style={paperStyle}>
                        <Avatar className="avatar">
                            <AssignmentIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <form className="form" noValidate>
                            <TextField
                                error={this.state.firstNameError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="first"
                                label="First Name"
                                name="first"
                                helperText={this.state.firstNameText}
                                autoFocus
                                onChange={({target: {value}})=> this.onChange(value, 'first')}
                                onKeyUp={({target: {value}})=> this.checkValidation(value, 'firstNameError')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                error={this.state.lastNameError}
                                required
                                fullWidth
                                id="last"
                                label="Last Name"
                                name="last"
                                autoFocus
                                helperText={this.state.lastNameText}
                                onChange={({target: {value}})=> this.onChange(value, 'last')}
                                onKeyUp={({target: {value}})=> this.checkValidation(value, 'lastNameError')}
                            />
                            <TextField
                                error={this.state.userNameError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="UserName"
                                name="userName"
                                helperText={this.state.userNameTextError}
                                autoFocus
                                onChange={({target: {value}})=> this.onChange(value, 'username')}
                                onKeyUp={({target: {value}})=> this.checkValidation(value, 'userNameError')}

                            />
                            <TextField
                                error={this.state.passwordError}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                helperText={this.state.passwordTextError}
                                onChange={({target: {value}})=> this.onChange(value, 'password')}
                                onKeyUp={({target: {value}})=> (this.checkValidation(value, 'passwordError'))}

                            />
                            <TextField
                                error={false}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="confirmpass"
                                label="Confirm Password"
                                type="password"
                                id="confirmpass"
                                onChange={({target: {value}})=> this.onChange(value, 'confirmpass')}
                            />
                            <br />
                            <br />
                        </form>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                            onClick={()=> this.onClick()}
                        >
                            Sign Up
                        </Button>
                    </div>
                    <br />
                </Container>
                {this.state.snackBarError && <Snackbars type="registerError" closeSnack={()=> this.closeSnack()}/>}
            </div>
        )};

        closeSnack() {
            this.setState({snackBarError: false})
        };

            // (שאלת בונוס - וולידציות בזמן אמת צד שרת)
        async checkValidation(value, field) {
            var pattern = /^([^0-9]*)$/;
            var pattern2 = (/^[0-9]+$/);
            var pattern3 = /^[a-zA-Z]+$/;
                if(field === 'firstNameError' && !value.match(pattern)) {
                    this.setState({[field]: true, firstNameText: "First name may not contain numbers"});
                }

                else if(field === 'firstNameError' && value.match(pattern)) {
                    this.setState({[field]: false, firstNameText: ''});
                } 

                else if(field === 'userNameError') {
                    const {data} = await Axios.get(`/auth/doesUserExist/${value}`);
                    if (data.userExists === true) {
                        this.setState({[field]: true, userNameTextError: "UserName already exists"})
                    }
                    else if (data.userExists === false) {
                        this.setState({[field]: false, userNameTextError: ""})
                    }
                }
                
                else if(field === 'lastNameError' && !value.match(pattern)) {
                    this.setState({[field]: true, lastNameText: "last name may not contain numbers"});
                }

                else if(field === 'lastNameError' && value.match(pattern)) {
                    this.setState({[field]: false, lastNameText: ''});
                }    

                else if (field === 'passwordError' && value.match(pattern2) === null && pattern3.test(value) === false && value.length > 5) {
                    this.setState({[field]: false, passwordTextError: ''});
                }
                else if (field === 'passwordError' && value.match(pattern2) !== null || pattern3.test(value) === true && value.length < 5) {
                    this.setState({[field]: true, passwordTextError: 'Password must contain at least 6 characters, 1 letter and 1 number'});
                } 
        }

        onChange(value, field) {
            this.setState({[field]: value});
        }
    
        async onClick() {
            const {
                password,
                confirmpass,
                firstNameError,
                lastNameError, 
                passwordError, 
                firstNameText, 
                lastNameText, 
                passwordTextError,
                userNameError,
                userNameTextError
            } = this.state;

            
            if (
                password && confirmpass &&
                password === confirmpass && 
                firstNameError === false && 
                lastNameError === false &&
                passwordError === false &&
                userNameError === false ) {
                try {
                    const {data} = await Axios.post('/auth/signup', _.omit(this.state, [
                        confirmpass,
                        firstNameError,
                        firstNameText,
                        lastNameError,
                        lastNameText,
                        passwordError,
                        passwordTextError,
                        userNameError,
                        userNameTextError
                    ]));
                    this.props.history.push('/login');
                } catch(err) {
                    console.log(err);
                };
        }
        else {
            this.setState({snackBarError: true});
        };
    };


};