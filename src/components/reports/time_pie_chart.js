import React from 'react';
import {Pie} from 'react-chartjs'

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
            data:[]
        }
    }
    options = {
        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke : true,
    
        //String - The colour of each segment stroke
        segmentStrokeColor : "#fff",
    
        //Number - The width of each segment stroke
        segmentStrokeWidth : 2,
    
        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout : 0, // This is 0 for Pie charts
    
        //Number - Amount of animation steps
        animationSteps : 50,
    
        //String - Animation easing effect
        animationEasing : 'easeInCubic',
    
        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate : true,
    
        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale : false,
        tooltipFontColor: '#fff',
        tooltipFontSize: 18   
    }
    
    colors = [
        '#69D1B3',
        '#7F69D1',
        '#D16987',
        '#FF78BF'
    ]

    componentDidMount(){
        activityget(this.props.beg.getFullYear(),this.props.beg.getMonth(),this.props.beg.getDate(),this.props.lookback).then(
            (x)=>{
                
                this.setState({ data: x.map(y=>y.Activity)
                    .filter((event,i,self)=>{
                        return self.indexOf(event) === i;
                    })
                    .map((ActivityType,y)=>{
                    return {label:ActivityType + ' (hours)',
                        value:x.reduce((a,e)=>{
                            let begDate = new Date(e.beg)
                            let endDate = new Date(e.end)

                            if (e.Activity==ActivityType){
                                return ((endDate-begDate)/(1000*60*60))+a
                            }
                            else{
                                return a
                            }
                        
                        },0),
                        color:this.colors[y%this.colors.length]
                    }
                    }
                )
            }
            )
        }
        )
    }



    render(){
        console.log(this.props)
        return(
            <div className="row">
            <Pie data={this.state.data} options={this.options} /> {ChartLegend(this.state.data)}
            </div>
        )
    }
}