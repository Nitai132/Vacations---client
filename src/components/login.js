import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
 import { connect } from 'react-redux'
import {AuthenticationSucess} from './actions'
import Snackbars from './snackbars'


  const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }


class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            error: false
        };
    };
    

    onChange(value, field) {
        this.setState({[field]: value});
    };

    async onClick() {
        try {
            await this.props.login(this.state);
            this.props.history.push('/');
        } catch (err) {
            this.setState({error: true});
            console.log(err);
        };
    };

    render() {
        return (
            <div> 
                <h3>Please sign in to continue</h3>
                <Container component="main" maxWidth="xs" >
                    <CssBaseline />
                    <div style={paperStyle}>
                        <Avatar >
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="userName"
                                label="UserName"
                                name="userName"
                                autoComplete="userName"
                                autoFocus
                                onChange={({target: {value}})=> this.onChange(value, 'username')}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={({target: {value}})=> this.onChange(value, 'password')}
                            />
                        </form>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={()=> this.onClick()}
                        >
                            Sign In
                        </Button>
                        <br />
                        <Link to="/signup" variant="body2">
                            {<h4 style={{color: 'blue'}}>Don't have an account yet? click here to Sign Up</h4>}
                        </Link>
                    </div>
                </Container>
                {this.state.error && <Snackbars type="loginError" closeSnack={()=> this.closeSnack()}/>}
            </div>
        )};



    closeSnack() {
        this.setState({error: false});
    }

    componentDidMount() {
        console.log(this.props.username)
    }
       
}

const mapStateToProps = state => {
    return {
        username: state.userDetails
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: detailsObj => dispatch(AuthenticationSucess(detailsObj))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login)