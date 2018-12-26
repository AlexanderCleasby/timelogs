import React from "react";
import Timepie from './time_pie_chart.js'
import './reports.css'



import {Pie} from 'react-chartjs'

import {activityget} from "../../api-requests/index.js";


const ChartLegend = (data)=>{
    
    return (
        <ul>
            {
                data.map((x,i)=>{
                    return <li key={i}>{x.label}</li>})
            }
        </ul>
    )
}

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
            
            
            <h3>Month:</h3>
            <Timepie beg={this.today} lookback={30} />
            </div>
            
        )
    }
}