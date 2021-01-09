import React from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import axios from 'axios';
import {connect} from 'react-redux'
import Spinner from './spinner';



class LikesReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vacationsLikes: []
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
        const Chart = () => 
          <div>
            <HighchartsReact
            highcharts={Highcharts}
            options={options}
            />
          </div>

        const options = {
            chart: {
                type: 'column'
              },
              title: {
                text: 'Vacations Likes Graph'
              },
              subtitle: {
                text: 'only vacations that have been liked are shown'
              },
              accessibility: {
                announceNewData: {
                  enabled: true
                }
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {
                title: {
                  text: 'Number of likes'
                }
            
              },
              legend: {
                enabled: false
              },
              plotOptions: {
                series: {
                  borderWidth: 0,
                  dataLabels: {
                    enabled: true,
                    format: '{y} likes'
                  }
                }
              },
            
              tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> users liked this<br/>'
              },
            
              series: [
                {
                  name: "Destination:",
                  colorByPoint: true,
                  data: this.state.vacationsLikes
                }
              ]   
        };
        return (
            <div>
                {this.props.isAdmin === 1 && <Chart />}
                {this.props.isAdmin === 0 && 
                this.props.history.push('/')}
            </div>
        )
    };

    async componentDidMount() { 
        try {
            const {data} = await axios.get('/getAllVacationsLikes');
            const vacationsLikes = data.result.filter(vacation => vacation.y > 0)
            this.setState ({vacationsLikes});
        }catch (err) {
            console.log(err);
        };
    }; 
};

const mapStateToProps = state => {
  return {
      isAdmin: state.userDetails.isAdmin,
      pending: state.userDetails.pending
  }
}


export default connect(mapStateToProps, null)(LikesReport)