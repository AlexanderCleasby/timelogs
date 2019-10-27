import React from 'react';
import {Pie} from 'react-chartjs'

import {activityget} from "../../api-requests/index.js";


export default class timepie extends React.Component{
    constructor(props){
        super();
        this.state = {
            selectedActivity:''
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
    
    ChartLegend = (data)=>{
        return (
            <div className="legendCont">
            <table>
                <tbody>
                    {
                        data.map((x,i)=>{
                            return (
                            <tr key={i} onClick={()=>{this.props.ChangeSelectEvent(x)}}>
                                <td> <div className="legendSquare" style={{backgroundColor:x.color}} ></div> </td>
                                <td>{x.label}</td>
                                <td>{x.value}</td>
                                <td>hours</td>
                            </tr>)
                            }
                        )
                    }
                </tbody>
                </table>
                <div className="footer">* Click one.</div>
            </div>
        )
    }

    formatData = ()=>{
        let activities = this.props.activities
        let label = activities.map(x=>x.Activity).filter((event,i,self)=>self.indexOf(event) === i)

        return label.map((ActivityType,i)=>{
            return {label:ActivityType,
                value:activities.reduce((a,e)=>{
                    let begDate = new Date(e.beg)
                    let endDate = new Date(e.end)

                    if (e.Activity==ActivityType){
                        return ((endDate-begDate)/(1000*60*60))+a
                    }
                    else{
                        return a
                    }
                },0),
                color:this.colors[i%this.colors.length]
            }
        })
    }

    componentDidMount(){
        this.data=this.formatData()
    }



    render(){
        return(
            <div className="container d-flex flex-wrap justify-content-center">
            <Pie data={this.formatData()} options={this.options} /> {this.ChartLegend(this.formatData())}
            </div>
        )
    }
}