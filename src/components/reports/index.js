import React from "react";
import Timepie from './time_pie_chart.js'
import Timebar from './time_bar_chart.js'
import './reports.css'




export default class reports extends React.Component{
    events =[]
    today = new Date(Date.now())
    constructor(props){
        super()
        this.state = {
            data:[]
        }

    }

    render(){
        
        return(
            <div className="container">
            
            <h3>Week:</h3>
            <Timepie beg={this.today} lookback={7} />
            <Timebar  beg={this.today} interval={1} lookback={7} />
            
            
            <h3>Month:</h3>
            <Timepie beg={this.today} lookback={30} />
            <Timebar  beg={this.today} interval={1} lookback={7} />
            </div>
            
            
        )
    }
}