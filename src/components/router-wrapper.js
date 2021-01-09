import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import Login from './login';
import Signup from './signup';
import HomePage from './homepage';
import AddVacation from './add-vacation';
import LikesReport from './likes-report';
import NavBar from './navbar';
import { connect } from 'react-redux'
import {loginDetails} from './actions'
import ShowTheLocationWithRouter from './withrouter'


class RouterWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: ''
        }
    };

   
    render() {
        return (
            <Router>
                <NavBar/>
                <ShowTheLocationWithRouter getLocation={(value)=> this.getLocation(value)}/>
                <Switch>
                    <Route path="/signup" component={Signup}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/addVacation" component={AddVacation}/>
                    <Route path="/likesReport" component={LikesReport}/>
                    <Route path="/" component={HomePage}/>
                </Switch>
            </Router>
         )
    }


    

    componentDidUpdate() {
        if (this.state.location !== '/login') {
            this.props.userDetails();
        }
    }

    componentDidMount() {
        if (this.state.location !== '/login') {
            this.props.userDetails();
        }
    }

    getLocation(value) {
        this.setState({location: value})
    }

    
}

const mapDispatchToProps = (dispatch) => {
    return {
        userDetails: () => dispatch(loginDetails()),
    };
};


export default connect(null, mapDispatchToProps)(RouterWrapper);


