import React from 'react';
import axios from 'axios';
import Vacation from './vacation';
import { connect } from 'react-redux'
import {AuthenticationFailed} from './actions'
import Spinner from './spinner';


class HomePage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            vacations: [],
            spinner: 'show'
        };
    };

    render() {
        const {vacations, spinner} = this.state;
        const {authenticated} = this.props.authentication;
        if (authenticated) {
            return (
                <div>
                    <div className={spinner}>
                        <Spinner timer={270}/>
                    </div>
                    {vacations.map((vacation, idx) => {
                        return (
                            <Vacation 
                            vacation={vacation} 
                            onDelete={(id)=> this.onDelete(id)} 
                            getVacations={()=> this.getVacations()} 
                            key={idx}
                            />
                        )
                    })}
                </div>
            );
        };
        return (
            <div>
                {this.props.history.push('/login')};
            </div>
        ); 
    };

    async onDelete(id) {
        await axios.delete(`deleteVacation/${id}`);
        this.getVacations();
    };

    async getVacations() {
        try {
            const {data} = await axios.get('/allvacations');
            for (let i=0;i<data.vacations.length;i++) {
                const {data: LikeExists} = await axios.get(`/doesLikeExists/${data.vacations[i].id}`);
                Object.assign(data.vacations[i], {likeExists: Object.values(LikeExists)[0]});
            };
            const vacations = data.vacations.sort((a, b) => {
                return b.likeExists - a.likeExists;
            });
            this.setState({vacations, spinner: 'hide'});
        } catch {
            this.props.notAuthenticated();
        };
    }    
    


    async componentDidMount() {
        try {
            this.getVacations();
        } catch {
            this.props.notAuthenticated();
        };
    };


};


const mapStateToProps = state => {
    return {
        authentication: state.authentication,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        notAuthenticated: () => dispatch(AuthenticationFailed()),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);