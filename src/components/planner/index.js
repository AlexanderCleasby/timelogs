import React from "react";
import "./planner.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'


export default class planner extends React.Component{
    constructor(props){
        super()
        this.hours = [];
        this.state={
            activities:props.activities
        }
        for (let i = 0; i<=1;i++){
            var AmPm
            if (i===0){
                AmPm='AM'
            }
            else{
                AmPm='PM'
            }
            this.hours.push('12'+AmPm)
            for (let j = 1; j <=11;j++ ){
                this.hours.push(j+AmPm)
            }
            console.log(props)
        }
    }
    
    render(){
        
        this.props.activities.sort((a,b)=>{return new Date(a.beg)-new Date(b.beg)})
        return(
        <div className="Plannercont">
            <div className="timeDisplay">
            <h2  className="timeLabel">
                <FontAwesomeIcon icon={faChevronCircleLeft} className="arrow" onClick={this.props.back} value="back" /> 
            </h2>
            <ul>
                {this.hours.map((hour,i)=>{
                    return <li key={i}>{hour}</li>
                })
                }
            </ul>
            </div>
            <div >
                <h2 className="timeLabel dayLabel">
                    
                    {this.props.day.toDateString().substring(0,3)} {(this.props.day.getMonth()+1)+"/"+this.props.day.getDate()}
                </h2>
                
                <ul className="daySchedule" >
                    {this.props.activities.map((activity,i)=>{
                        let begDate = new Date(activity.beg)
                        let endDate = new Date(activity.end)
                        return <li 
                        key={i} 
                        className="activityBlock" 
                        style={{top:(((begDate-this.props.day)/(24*60*60*1000))*100+"%"),
                        height:(((endDate-begDate)/(24*60*60*1000))*100+"%")}}>
                        {activity.Activity} {begDate.getHours()>12 ? begDate.getHours()-12 : begDate.getHours()}:{begDate.getMinutes().toString().padStart(2, '0')}{begDate.getHours()>12 ? "p":"a"} - {endDate.getHours()>12 ? endDate.getHours()-12 : endDate.getHours()}:{endDate.getMinutes().toString().padStart(2, '0')}{endDate.getHours()>12 ? "p":"a"}</li>
                    })}
                </ul>
            </div>
            <div className="timeDisplay">
                <h2  className="timeLabel">
                    <FontAwesomeIcon icon={faChevronCircleRight} className="arrow" onClick={this.props.nextdate} value="foraward" /> 
                </h2>
            </div>
        </div>
        )
    }
}