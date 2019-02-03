import React from 'react';
import {Bar} from 'react-chartjs'


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
            labels:[],
            datasets: [
                {
                    label: "Hours",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data: []
                }
            ]
            },
            
            intervals:[]
        };
    }
    formatDate(date){
        return date.getMonth()+1+"/"+date.getDate()
    }
    eventInBounds(events,type,beg,int){
        var end = new Date(beg.getFullYear(),beg.getMonth(),beg.getDate()+int)
        //console.log(beg,end)
        return events.reduce((a,e)=>{
            let begDate = new Date(e.beg)
            let endDate = new Date(e.end)
            //console.log(beg,end)
            if (e.Activity==type && begDate>beg && endDate<end){
                return ((endDate-begDate)/(1000*60*60))+a
            }
            else{
                return a
            }
        },0)
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
        this.setState({intervals:Array.apply(null, {length: this.props.lookback/this.props.interval}).map((v, i)=>{
            return new Date(this.props.beg.getFullYear(), this.props.beg.getMonth(), this.props.beg.getDate()-(this.props.interval*i))
        }).reverse()})
        activityget(this.props.beg.getFullYear(),this.props.beg.getMonth(),this.props.beg.getDate(),this.props.lookback).then((x)=>{
            this.setState({
                data:{
                    labels:this.state.intervals.map((date)=>this.formatDate(date)),
                    datasets:[{
                        label: "Hours",
                        fillColor: "rgba(220,220,220,0.5)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data: Array.apply(null, {length: this.props.lookback/this.props.interval}).map((v, i)=>{
                            console.log(this.state.intervals[i])
                            return this.eventInBounds(x,"Code",this.state.intervals[i],this.props.interval)
                        })
                    }]}
        })
        })
        //this.formatDate(new Date(this.props.beg.getFullYear(), this.props.beg.getMonth(), this.props.beg.getDate()))
    }
    
    render(){
        return(
            <div className="row">
            <Bar data={this.state.data} options={this.options} />
            </div>
        )
    }
}