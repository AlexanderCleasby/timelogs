import React, { Component } from 'react';
import "./newevent.css";
import axios from 'axios'
import TimeSelect from "./timeSelect"
import { connect } from "react-redux"
import { numoptions } from './timeUtility'
import { newEvent } from "../../actions/activitiesActions"


class newevent extends Component {
    constructor(props) {
        super(props);
        const now = props.newEventTime || new Date(Date.now())
        this.state={
            smonth:(now.getMonth()+1).toString().padStart(2,'0'),
            sday:(now.getDate()).toString().padStart(2,'0'),
            syear:now.getFullYear().toString(),
            ActivityName:'',
            Note:'',
            ActivityTypes:[],
            Start:now,
            End:new Date(now.getTime()+3600*1000)
        }
        this.GetActivities()    
    }

    Submit = e => {
        e.preventDefault();
        this.props.newEvent({
            beg: this.state.Start,
            end: this.state.End,
            ActivityName: this.state.ActivityName,
            Note: this.state.Note
        }).then(() => this.props.modalClose())
    }

    GetActivities = e=>{
        axios.get('/trackerapi/getactivitytypes').then(
            (res)=>{
                
                this.setState({ActivityTypes:res.data})
            }
        )
    }

    valchange = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    ChangeTime = (target,e) => {
        let newTime =this.state[target]
        switch (e.target.name){
            case "hour":
                newTime.setHours(e.target.value)
            break
            case "min":
                newTime.setMinutes(e.target.value)
            break
            case "AMPM":
                if (e.target.value==="PM" && newTime.getHours()<12){
                    newTime.setHours(newTime.getHours()+12)
                }
                else if (e.target.value==="AM" && newTime.getHours()<12){
                    newTime.setHours(newTime.getHours-12)
                }
            break
            default:
                console.error("changeTime callse without a valid name.")
            break
        }
        this.setState({[target]:newTime})
        
    }

    validation = ()=>{
        if (this.state.Start>this.state.End){
            return <div className="alert alert-warning col-12" role="alert">Start time is after end time.</div>
        }
        else {
            return false
        }
    }
      
    render(){
        return (
            <form id="cont" className="form" onSubmit={this.Submit}>
                <div className='form-row'>
                {this.validation()}
                </div>
                <div className='form-row'>
                <label className="col col-form-label">Day:</label>
                <select className="col form-control" name="smonth" value={this.state.smonth} onChange={this.valchange}>
                    {numoptions(12)}
                </select>/
                <select className="col form-control" name="sday" value={this.state.sday} onChange={this.valchange}>
                    {numoptions(31)}
                </select>/
                <select className="col form-control" name="syear" value={this.state.syear} onChange={this.valchange}>
                    {numoptions(3,2017)}
                </select>
                </div>
                
                <TimeSelect time={this.state.Start} label={"Start"} change={this.ChangeTime.bind(this)} />
                
                <TimeSelect time={this.state.End} label={"End"} change={this.ChangeTime.bind(this)} />
                
                <div className='form-row'>
                <label className="col-2 col-form-label">Activity:</label>
                </div>
                <div className='form-row'>
                <select className="col-10 form-control" name="ActivityName" value={this.state.ActivityName} onChange={this.valchange} >
                    <option value="" disabled>Pick an activity:</option>
                    {
                        this.state.ActivityTypes.map((activity,i)=>{
                            return <option className="list-group-item" key={i} value={activity.activitytype}>{activity.activitytype}</option>
                        })
                    }
                </select>
                </div>
                <div className='form-row'>
                <label className="col-2 col-form-label">Note:</label>
                </div>
                <div className='form-row'>
                <input className="col-10 form-control" type="text" name="Note" value={this.state.Note} onChange={this.valchange}></input>
                </div>
                <div className='form-row'>
                <input type="submit" value="Submit" className="btn btn-primary" disabled={this.validation() || this.state.ActivityName === ""}/>
                </div>
          </form>
      );
    }
    }

    export default connect(state=>state,{newEvent})(newevent)    
