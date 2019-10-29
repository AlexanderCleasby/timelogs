import React from 'react';
import {Bar} from 'react-chartjs'
import moment from 'moment'

export default class timebar extends React.Component{

    formatDate(date){
        return date.getMonth()+1+"/"+date.getDate()
    }
    eventInBounds(events,type,beg,int){
        //set "end" to one interval after the begining of the interval
        let end = beg.clone().add(int,'days')
        return events.reduce((a,e)=>{
            let begDate = moment(e.beg)
            let endDate = moment(e.end)
            //If activity matches the selected type then add it to the sum
            if (e.Activity===type && begDate.isAfter(beg) && endDate.isBefore(end)){
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

    shouldComponentUpdate(newProps){
        return (this.props.SelectedEvent!==newProps.SelectedEvent)
    }

    data = ()=>{
        let endOfPeriod = this.props.interval===1 ? moment() : moment().subtract(this.props.interval,"day").startOf('day')
        let intervals = Array.apply(null,{length: this.props.lookback/this.props.interval}).map((v,i)=>endOfPeriod.clone().subtract(this.props.interval*i,"day")).reverse()
        return {
            labels:intervals.map((int)=>int.format("MM/DD")),
            datasets:[{
                fillColor:this.props.SelectedEvent.color,
                strokeColor:this.props.SelectedEvent.color,
                highlightFill:this.props.SelectedEvent.color,
                highlightStroke:this.props.SelectedEvent.color,
                data:intervals.map((interval)=>this.eventInBounds(this.props.activities,this.props.SelectedEvent.label,interval,this.props.interval))
            }]
        }
    }

    render(){
        return(
            <div className="row">
            <Bar data={this.data()} redraw />
            </div>
        )
    }
}
