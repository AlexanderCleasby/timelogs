import React from "react";
import "./day.css";
import Newevent from "../newevent"
import Planner from "../planner"

import { Modal, ModalHeader,  ModalBody, ModalFooter } from "reactstrap"
import axios from 'axios'




export default class day extends React.Component{
    constructor(){
        super()
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDateBack = this.handleDateBack.bind(this)
        this.handleDateForward = this.handleDateForward.bind(this)

        this.state = {
          show: false,
          date: (()=>{let x =new Date(Date.now())
                x.setHours(0,0,0,0)
                return x})(),
          activities: []
        };
        
    }
    
    componentDidMount(){
        axios.get('trackerapi/getactivities?year='+this.state.date.getFullYear()+'&month='+this.state.date.getMonth()+'&day='+this.state.date.getDate()).then(
            (res)=>{
                this.setState({activities:res.data})
                console.log("Activities found:",res.data)
            }
        )
    }

    handleClose() {
        this.setState({ show: false });
        axios.get('trackerapi/getactivities?year='+this.state.date.getFullYear()+'&month='+this.state.date.getMonth()+'&day='+this.state.date.getDate()).then(
            (res)=>{
                this.setState({activities:res.data})
                console.log("Activities found:",res.data)
            }
        )
    }
    
    handleShow() {
        this.setState({ show: true });
        
    }

    handleDateBack = (e) => {
        e.preventDefault()
        console.log(this.state.date)
        this.setState({
                    date: new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate() - 1)
                }, () => {
        axios.get('trackerapi/getactivities?year=' + this.state.date.getFullYear() + '&month=' + this.state.date.getMonth() + '&day=' + this.state.date.getDate()).then(
            (res) => {
                this.setState({
                    activities: res.data
                })
                console.log("Activities found:", res.data)
            }
        )
        }
        )
    }
    handleDateForward = (e) =>{
        e.preventDefault()
        console.log(this.state.date)
        this.setState({
                    date: new Date(this.state.date.getFullYear(), this.state.date.getMonth(), this.state.date.getDate() + 1)
                }, () => {
        axios.get('trackerapi/getactivities?year=' + this.state.date.getFullYear() + '&month=' + this.state.date.getMonth() + '&day=' + this.state.date.getDate()).then(
            (res) => {
                this.setState({
                    activities: res.data
                })
                console.log("Activities found:", res.data)
            }
        )
        }
        )
    }
    render(){
    return(
    
    <div className="ComponentCont">
        Hello User what have you been doing today?
        <Planner id="Planner" day={this.state.date} activities={this.state.activities} back={this.handleDateBack} nextdate={this.handleDateForward} />
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