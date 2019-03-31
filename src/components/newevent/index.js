import React, { Component } from 'react';
import "./newevent.css";
import axios from 'axios'
import { Alert } from 'reactstrap';
//import DateTimePicker from 'react-datetime-picker';


export default class newevent extends Component {
    constructor(props) {
        super(props);
        var now = new Date(Date.now())
        this.state={
            smonth:(now.getMonth()+1).toString().padStart(2,'0'),
            sday:(now.getDate()).toString().padStart(2,'0'),
            syear:now.getFullYear().toString(),
            shour:'12',
            smin:'00',
            sAmPm:'AM',
            ehour:'01',emin:'00',eAmPm:'AM',
            ActivityName:'',
            Note:'',
            ActivityTypes:[],
            start:new Date(Date.now()),
            end:new Date(Date.now()+3600*1000)
        }
        
        
        this.GetActivities()
        
        this.Submit=this.Submit.bind(this)
        this.valchange=this.valchange.bind(this)
    }
    Submit = e =>{
       
        axios.post('/trackerapi/newactivity',{
        beg:TimeConvert(this.state.syear,this.state.smonth,this.state.sday,this.state.shour,this.state.smin,this.state.sAmPm),
        end:TimeConvert(this.state.syear,this.state.smonth,this.state.sday,this.state.ehour,this.state.emin,this.state.eAmPm),
        ActivityName:this.state.ActivityName,Note:this.state.Note}).then((res)=>{console.log(res)})
        this.props.modalClose()
        e.preventDefault();
    }

    GetActivities = e=>{
        axios.get('/trackerapi/getactivitytypes').then(
            (res)=>{
                console.log(res)
                this.setState({ActivityTypes:res.data})
            }
        )
    }

    valchange = e => {
        this.setState({[e.target.name]:e.target.value})
    }

    validation = ()=>{
        if (TimeConvert(this.state.syear,this.state.smonth,this.state.sday,this.state.shour,this.state.smin,this.state.sAmPm)>TimeConvert(this.state.syear,this.state.smonth,this.state.sday,this.state.ehour,this.state.emin,this.state.eAmPm)){
            return <div className="alert alert-warning col-12" role="alert">Start time is after end time.</div>
        }
        else {
            return false
        }
    }
      
    render(){
        console.log(this.validation(),this.state.ActivityName)
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
                <div className='form-row'>
                <label  className="col col-form-label">Start:</label>
                <select className="col form-control" name="shour" value={this.state.shour} onChange={this.valchange}>
                    {numoptions(12)}
                </select>:
                <select className="col form-control" name="smin" value={this.state.smin} onChange={this.valchange}>
                    {numoptions(60,0,true)}
                </select>
                <select className="col form-control" name="sAmPm" value={this.state.sAmPm} onChange={this.valchange}>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                </select>
                </div>
                <div className='form-row'>
                <label  className="col col-form-label">End:</label>
                <select className="col form-control" name="ehour" value={this.state.ehour} onChange={this.valchange}>
                    {numoptions(12)}
                </select>:
                <select className="col form-control" name="emin" value={this.state.emin} onChange={this.valchange}>
                    {numoptions(60,0,true)}
                </select>
                <select className="col form-control" name="eAmPm" value={this.state.eAmPm} onChange={this.valchange}>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                </select>
                </div>
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
                <input type="submit" value="Submit" className="btn btn-primary" disabled={this.validation() || this.state.ActivityName == ""}/>
                </div>
          </form>
      );
    }
    }

    const numoptions = (num,start,padInner)=>{
        if(start==null){
            start=1
        }
        let ops=[]
        if(padInner){
            for(let i=start;i<num+start;i++){
                ops.push(<option value={i.toString().padStart(num.toString().length,'0')} key={i} >{i.toString().padStart(num.toString().length,'0')}</option>)
        }}
        else{
            for(let i=start;i<num+start;i++){
                ops.push(<option value={i.toString().padStart(num.toString().length,'0')} key={i} >{i}</option>)
        }}
        return ops
    }
    const TimeConvert= (year,month,day,hour,min,AMPM)=>{
        
        month=parseInt(month,10)-1
        hour=parseInt(hour,10)
        if(hour==12){
            hour=0
        }
        if(AMPM=='PM'){
            hour=hour+12
        }
        return new Date(parseInt(year,10),month,parseInt(day,10),hour,parseInt(min,10))
    }
