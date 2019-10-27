import React from "react";
import moment from 'moment'
import Timepie from './time_pie_chart.js'
import Timebar from './time_bar_chart.js'
import { connect } from "react-redux";
import './reports.css'




class reports extends React.Component{
    today = new Date(Date.now())
    constructor(props){
        super()
        this.state = {
            SelectedWeekly:'Code',
            SelectedMonthly:'Code'
        }
    }

    past = (time)=>this.props.activities.filter((activity)=>moment(activity.beg).isBetween(moment().subtract(1,time),undefined))

    ChangeSelectEventWeekly = (sel)=>{
        this.setState({SelectedWeekly:sel})
    }

    ChangeSelectEventMonthly = (sel)=>{
        this.setState({SelectedMonthly:sel})
    }

    render(){
        
        return(
            <div className="container d-flex flex-wrap">
                <div className="container d-flex flex-wrap justify-content-start">
                    <h3>Week:</h3>
                    <Timepie activities={this.past("week")} beg={this.today} lookback={7} ChangeSelectEvent={this.ChangeSelectEventWeekly} />
                </div>
                <div className="container d-flex flex-wrap justify-content-center">
                    <Timebar activities={this.past("week")}  beg={this.today} interval={1} lookback={7} SelectedEvent={this.state.SelectedWeekly} />
                </div>
            
            
            
                <div className="container d-flex flex-wrap justify-content-start">
                    <h3>Month:</h3>
                    <Timepie activities={this.past("month")} beg={this.today} lookback={30} ChangeSelectEvent={this.ChangeSelectEventMonthly} />
                </div>
                <div className="container d-flex flex-wrap justify-content-center">
                    <Timebar activities={this.past("month")} beg={this.today} interval={7} lookback={28} SelectedEvent={this.state.SelectedMonthly} />
                </div>
            </div>
            
        )
    }
}

export default connect(state=>state)(reports)