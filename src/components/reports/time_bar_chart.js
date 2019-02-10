import React from 'react';
import {Bar} from 'react-chartjs'


import {activityget} from "../../api-requests/index.js";



export default class timebar extends React.Component{
    constructor(props){
        super();
        this.state = {
            data:{
            labels:[],
            datasets: [
                {
                    label: "Hours",
                    fillColor:"#111",
                    data: []
                }
            ]
            },
            events:[],
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
    dataChange(data,selection){
        this.setState({
            data:{
                labels:this.state.intervals.map((date)=>this.formatDate(date)),
                datasets:[{
                    label: "Hours",
                    fillColor: selection.color,
                    strokeColor: selection.color,
                    highlightFill: selection.color,
                    highlightStroke: selection.color,
                    data: Array.apply(null, {length: this.props.lookback/this.props.interval}).map((v, i)=>{
                        return this.eventInBounds(data,selection.label,this.state.intervals[i],this.props.interval)
                    })
                }]}
    })
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
    componentWillReceiveProps(props){
        console.log(props.SelectedEvent.color)
        this.dataChange(this.state.events,props.SelectedEvent);    
    }

    componentDidMount(){
        this.setState({intervals:Array.apply(null, {length: this.props.lookback/this.props.interval}).map((v, i)=>{
            return new Date(this.props.beg.getFullYear(), this.props.beg.getMonth(), this.props.beg.getDate()-(this.props.interval*i))
        }).reverse()})
        activityget(this.props.beg.getFullYear(),this.props.beg.getMonth(),this.props.beg.getDate(),this.props.lookback).then((x)=>{
            this.setState({events:x})
            
        })
    }
    
    render(){
        return(
            <div className="row">
            <Bar data={this.state.data}  />
            </div>
        )
    }
}