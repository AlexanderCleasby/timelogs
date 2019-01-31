import React from 'react';
import {Pie,Bar} from 'react-chartjs'


import {activityget} from "../../api-requests/index.js";

const ChartLegend = (data)=>{
    
    return (
        <table>
        <tbody>
            {
                data.map((x,i)=>{
                    return <tr key={i}>
                    <td> <div className="legendSquare" style={{backgroundColor:x.color}} ></div> </td>
                    <td>{x.label}</td>
                    <td>{x.value}</td>
                    </tr>})
            }
        </tbody>
        </table>
    )
}

export default class timepie extends React.Component{
    constructor(props){
        super();
        this.state = {
            data:{
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(151,187,205,0.5)",
                    strokeColor: "rgba(151,187,205,0.8)",
                    highlightFill: "rgba(151,187,205,0.75)",
                    highlightStroke: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        }};
    }
    options = {
        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero : true,
    
        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,
    
        //String - Colour of the grid lines
        scaleGridLineColor : "rgba(0,0,0,.05)",
    
        //Number - Width of the grid lines
        scaleGridLineWidth : 1,
    
        //Boolean - Whether to show horizontal lines (except X axis)
        scaleShowHorizontalLines: true,
    
        //Boolean - Whether to show vertical lines (except Y axis)
        scaleShowVerticalLines: true,
    
        //Boolean - If there is a stroke on each bar
        barShowStroke : true,
    
        //Number - Pixel width of the bar stroke
        barStrokeWidth : 2,
    
        //Number - Spacing between each of the X value sets
        barValueSpacing : 5
    }
    
    colors = [
        '#69D1B3',
        '#7F69D1',
        '#D16987',
        '#FF78BF'
    ]
    componentDidMount(){
    //this.setState({data:[{label:"red",value:4}]})
    }
    
    render(){
        return(
            <div className="row">
            <Bar data={this.state.data} options={this.options} />
            </div>
        )
    }
}