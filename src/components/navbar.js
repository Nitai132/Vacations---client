
import React from 'react';
import { connect } from 'react-redux'
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {logUserOut,  AuthenticationFailed} from './actions'
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    color: 'white'
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      {props.pending === true && <AppBar position="fixed">
        <Toolbar>
        </Toolbar>
      </AppBar> }
      {props.username === 'guest'  && <AppBar position="fixed">
        <Toolbar>
          <Link to="/signup"><Button color="inherit">Register</Button></Link>
            <Typography variant="h6" className={classes.title}>
              Hello Guest, Welcome to Nitai Vacations
            </Typography>
          <Link to="/login"><Button color="inherit">Login</Button></Link>
        </Toolbar>
      </AppBar>}
      {props.username !== 'guest' && props.isAdmin === 0 && <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{marginLeft: '80px'}}>
                Welcome {props.username}
          </Typography>
          <Link to="/login"><Button color="inherit" variant="contained" color="secondary" onClick={()=> props.logout()}>logout</Button></Link>
        </Toolbar>
      </AppBar>}
      {props.username !== 'guest' && props.isAdmin === 1 && <AppBar position="fixed">
        <Toolbar>
        <div>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}><Link to="/addVacation" style={{color: 'black'}}>Add vacation</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to="/likesReport" style={{color: 'black'}}>Likes Report</Link></MenuItem>
          </Menu>
        </div>
          <Typography variant="h6" className={classes.title} style={{marginLeft: '80px'}}>
            Welcome {props.username}
          </Typography>
          <Link to="/">
            <Button color="inherit">
              <HomeIcon></HomeIcon>
            </Button>
          </Link>
          <Link to="/login">
            <Button 
            color="inherit" 
            variant="contained" 
            color="secondary" 
            onClick={()=> {props.logout(); props.notAuthenticated()}}
            >
                logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>}
    </div>
  );
};

const mapStateToProps = state => {
    return {
        username: state.userDetails.username,
        isAdmin: state.userDetails.isAdmin,
        pending: state.userDetails.pending
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logUserOut()),
        notAuthenticated: () => dispatch(AuthenticationFailed()),       
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);