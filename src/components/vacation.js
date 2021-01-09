import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import FormDialog from './modal';
import _ from 'lodash';

const rootStyle = {
    maxWidth: 345,
    height: 526,
    float: "left",
    marginRight: 15,
    marginLeft:  18,
    marginTop: 50,
    paddingBottom: '30px'
  }

  const rootStyleLiked = {
    maxWidth: 345,
    height: 526,
    float: "left",
    marginRight: 15,
    marginLeft:  18,
    marginTop: 50,
    backgroundColor: 'lightgrey',
    paddingBottom: '30px'
  }

  const mediaStyle = {
    height: 250,
    width: 345,
  }

  const priceStyle = {
    color: 'green',
     float: 'right',
     position: 'relative',
     top: '45px',
     left: '73px'
  }

  const priceTextStyle = {
    color: 'black',
     float: 'right',
     position: 'relative',
     top: '30px',
  }

  const LikeButtonStyle = {
    position: 'relative', 
    left: '74px',
    top: '60px'
  }

  const deleteButtonStyle = {
    position: 'relative', 
    left: '110px',
    top: '30px',
    
  }

  const returnDateStyle = {
    position: 'absolute',
    marginTop: '80px',
}

const returnDateTextStyle = {
    position: 'absolute',
    marginTop: '60px',
    color: 'grey'

}

const dateStyle = {
    position: 'absolute',
    marginTop: '40px',
}

const dateTextStyle = {
    position: 'absolute',
    marginTop: '20px',
    color: 'grey'

}


class Vacation extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            likeExists: false,
            likes: '',
            description: this.props.vacation.description,
            destination: this.props.vacation.destination,
            image: this.props.vacation.image,
            fromDate: this.props.vacation.fromDate,
            untilDate: this.props.vacation.untilDate,
            price: this.props.vacation.price
        };
    };

    render() {
        const {likes, likeExists} = this.state;
        if (this.props.vacation.fromDate) {
            return (
                <div>
                {this.props.isAdmin === 0  && likeExists === true && 
                <Card className="root" style={rootStyleLiked}>
                    <CardMedia 
                    className="media"
                    style={mediaStyle}
                    image={this.props.vacation.image}
                    title="Contemplative Reptile"
                    />
                    <span style={{color: 'blue'}}>{likes} users liked this vacation</span>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="h2">
                                {this.props.vacation.destination}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {this.props.vacation.description}
                        </Typography>
                        <h6 style={dateTextStyle}>
                            vacation flight time:
                        </h6>
                        <h6 style={dateStyle}>
                            {this.props.vacation.fromDate.replace(/\.\d+/, "").replace(':00Z', "")}
                        </h6>
                        <h6 style={returnDateTextStyle}>
                            vacation return time:  
                        </h6>
                        <h6 style={returnDateStyle}>
                            {this.props.vacation.untilDate.replace(/\.\d+/, "").replace(':00Z', "")}
                        </h6>
                        <h5 style={priceTextStyle}>
                            Get it now for
                        </h5>
                        <h2 style={priceStyle}>
                            {this.props.vacation.price}$
                        </h2>
                        <Button style={LikeButtonStyle} size="small" variant="contained" color="primary" onClick={()=> this.addLike()}>
                            like 
                            <ThumbUpIcon></ThumbUpIcon> 
                        </Button>  
                    </CardContent>
                </Card>}

                {this.props.isAdmin === 0  && likeExists === false && 
                    <Card className="root" style={rootStyle}>
                        <CardMedia 
                        className="media"
                        style={mediaStyle}
                        image={this.props.vacation.image}
                        title="Contemplative Reptile"
                        />
                        {likes} users liked this vacation
                        <CardContent >
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.vacation.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.vacation.description}
                            </Typography>
                            <h6 style={dateTextStyle}>
                                vacation flight time:
                            </h6>
                            <h6 style={dateStyle}>
                                {this.props.vacation.fromDate.replace(/\.\d+/, "").replace(':00Z', "")}
                            </h6>
                            <h6 style={returnDateTextStyle}>
                                vacation return time:
                            </h6>
                            <h6 style={returnDateStyle}>
                                {this.props.vacation.untilDate.replace(/\.\d+/, "").replace(':00Z', "")}
                            </h6>
                            <h5 style={priceTextStyle}>
                                Get it now for
                            </h5>
                            <h2 style={priceStyle}>
                                {this.props.vacation.price}$
                            </h2>
                            <Button style={LikeButtonStyle} size="small" variant="contained" color="primary" onClick={()=> this.addLike()}>
                                like 
                                <ThumbUpIcon></ThumbUpIcon> 
                            </Button>  
                        </CardContent>
                    </Card>}

                {this.props.isAdmin === 1 && 
                    <Card className="root" style={rootStyle}>
                        <CardMedia 
                        className="media"
                        style={mediaStyle}
                        image={this.props.vacation.image}
                        title="Contemplative Reptile"
                        />
                        {likes} users liked this vacation
                        <CardContent >
                            <Typography gutterBottom variant="h6" component="h6">
                                {this.props.vacation.destination}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {this.props.vacation.description}
                            </Typography>
                            <h6 style={dateTextStyle}>
                                vacation flight time:
                            </h6>
                            <h6 style={dateStyle}>
                                {this.props.vacation.fromDate.replace(/\.\d+/, "").replace(':00Z', "")}
                            </h6>
                            <h6 style={returnDateTextStyle}>
                                vacation return time:  
                            </h6>
                            <h6 style={returnDateStyle}>
                                {this.props.vacation.untilDate.replace(/\.\d+/, "").replace(':00Z', "")}
                            </h6>
                            <h5 style={priceTextStyle}>
                                Get it now for
                            </h5>
                            <h2 style={priceStyle}>
                                {this.props.vacation.price}$
                            </h2>
                        </CardContent>
                        <CardActions> 
                            <Button 
                            onClick={()=>this.props.onDelete(this.props.vacation.id)}
                            style={deleteButtonStyle}
                            >
                                <DeleteForeverIcon />
                            </Button>
                            <FormDialog
                            vacation={this.props.vacation} 
                            editVacation={(id)=> this.editVacation(id)} 
                            inputValueChanged={(value, field)=> this.inputValueChanged(value, field)}
                            />
                        </CardActions>
                    </Card>}
                </div>
              );
            }
        return (
            <div></div>
        )
    }


    inputValueChanged(value, field) {
        this.setState({[field]: value});
    };

    async editVacation() {
        try {
            await axios.post(`/updateVacation/${this.props.vacation.id}`, _.omit(this.state, ['likeExists', 'likes']));
            this.props.getVacations();
        } catch(err) {
            console.log(err);
        };
    };


    async addLike() {
        const {data: LikeExists} = await axios.get(`/doesLikeExists/${this.props.vacation.id}`);
        if (LikeExists.exists > 0){
            await axios.delete(`/deleteFollower/${this.props.vacation.id}`);
            const {data} = await axios.get(`/getVacationLikes/${this.props.vacation.id}`);
            this.setState({likes: data.likes, likeExists: false});

        }
        else {
            await axios.get(`/addFollower/${this.props.vacation.id}`);
            const {data} = await axios.get(`/getVacationLikes/${this.props.vacation.id}`);
            this.setState({likes: data.likes, likeExists: true});
        };
    };

    async componentDidMount() {
        const {data} = await axios.get(`/getVacationLikes/${this.props.vacation.id}`);
        const {data: LikeExists} = await axios.get(`/doesLikeExists/${this.props.vacation.id}`);
        if (LikeExists.exists > 0) {
            this.setState({likes: data.likes, likeExists: true});
        }
        this.setState({likes: data.likes});
    };


};

const mapStateToProps = state => {
    return {
        isAdmin: state.userDetails.isAdmin
    };
};


export default connect(mapStateToProps, null)(Vacation);