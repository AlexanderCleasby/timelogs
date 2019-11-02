import React from "react";
import "./day.css";
import Newevent from "../newevent"
import Planner from "../planner"
import moment from "moment";
import { connect } from "react-redux"
import { Modal, ModalHeader,  ModalBody, ModalFooter } from "reactstrap"
import { importActivities } from "../../actions/activitiesActions"




class day extends React.Component{
    constructor(){
        super()
        this.state = {
          show: false,
          date:moment().startOf("day")
        };
        
    }
    
    handleClose =()=>{
        this.setState({ show: false });
    }
    
    handleShow=()=>{
        this.setState({ show: true });
    }

    handleDateBack = (e) => {
        this.setState({date:this.state.date.subtract(1,"day")},this.checkDay())
    }

    handleDateForward = (e) =>{
        this.setState({date:this.state.date.add(1,"day")},this.checkDay())
    }

    activitiesDay = ()=>this.props.activities.filter((activity)=>moment(activity.beg).isAfter(this.state.date) && moment(activity.beg).isBefore(this.state.date.clone().add(1,"day")))

    checkDay = ()=>{
        if (this.state.date.isBefore(moment(this.props.span.start)) || this.state.date.isAfter(moment(this.props.span.end))){
            this.props.importActivities(this.state.date,0)
        }
    }

    render(){
        return(
        
            <div className="ComponentCont">
                Hello User what have you been doing today?
                <Planner id="Planner" day={this.state.date} activities={this.activitiesDay()} back={this.handleDateBack} nextdate={this.handleDateForward} refresh={this.handleClose} />
                <button className="btn btn-primary" onClick={this.handleShow}>
                    New Event
                </button>
                <Modal size="lg" id="newevent_Modal" isOpen={this.state.show} toggle={this.handleClose} >
                    <ModalHeader>
                        Add an Event!
                    </ModalHeader>
                    <ModalBody>
                        <Newevent modalClose={this.handleClose} />
                    </ModalBody>
                    <ModalFooter>
                        Do it now!
                    </ModalFooter>

                </Modal>
            </div>
        )}
}

export default connect(state=>state,{ importActivities })(day)
