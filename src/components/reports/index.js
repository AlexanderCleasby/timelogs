import React from "react";
import Timepie from './time_pie_chart.js'
import Timebar from './time_bar_chart.js'
import './reports.css'




export default class reports extends React.Component{
    today = new Date(Date.now())
    constructor(props){
        super()
        this.state = {
            SelectedWeekly:'Code',
            SelectedMonthly:'Code'
        }

    }

    ChangeSelectEventWeekly = (sel)=>{
        console.log(sel)
        this.setState({SelectedWeekly:sel})
    }

    ChangeSelectEventMonthly = (sel)=>{
        this.setState({SelectedMonthly:sel})
    }

    render(){
        
        return(
            <div className="container">
            
            <h3>Week:</h3>
            <Timepie beg={this.today} lookback={7} ChangeSelectEvent={this.ChangeSelectEventWeekly} />
            <Timebar  beg={this.today} interval={1} lookback={7} SelectedEvent={this.state.SelectedWeekly} />
            
            
            <h3>Month:</h3>
            <Timepie beg={this.today} lookback={30} ChangeSelectEvent={this.ChangeSelectEventMonthly} />
            <Timebar  beg={this.today} interval={7} lookback={28} SelectedEvent={this.state.SelectedMonthly} />
            </div>
            
            
        )
    }
}