import React from "react";
import "./planner.scss";
import Newevent from "../newevent"
import { Modal, ModalHeader,  ModalBody, ModalFooter } from "reactstrap"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'


export default class planner extends React.Component{
    constructor(props){
        super()
        this.handleClose = this.handleClose.bind(this);
        this.hours = [];
        this.state={
            activities:props.activities,
            newEventTime:null,
            show: false
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
        }
    }

    
    handleClose() {
        this.props.refresh()
        this.setState({ show: false });
    }
    newEvent = (t)=>{
        this.setState({newEventTime:new Date(this.props.day.year(),this.props.day.month(),this.props.day.date(),t),show: true })
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
                    {this.props.day.format("MM/DD")}
                </h2>
                
                <ul className="daySchedule" >
                    {Array.from(Array(24),(x,i)=>{
                        return <li className="imagineBlock" onClick={()=>{this.newEvent(i)}}></li> 
                    })}
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
            <Modal size="lg" id="newevent_Modal" isOpen={this.state.show} toggle={this.handleClose}>
                <ModalHeader>
                    Add an Event!
                </ModalHeader>
                <ModalBody>
                    <Newevent modalClose={this.handleClose} newEventTime={this.state.newEventTime} />
                </ModalBody>
                <ModalFooter>
                    Do it now!
                </ModalFooter>
            </Modal>
        </div>
        )
    }
}