import React from "react";
import "./useractivities.css";

import axios from 'axios'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'



export default class useractivities extends React.Component{
    constructor(props){
        super()
        this.state={
            NewActivityName:'',
            ActivityTypes:[]
        }
        this.GetActivities()
    }
    Submit = e=>{
        axios.post('trackerapi/newactivitytype',{
            activitytype:this.state.NewActivityName
        }).then((res)=>{
            this.GetActivities()
        }    
        )
        this.setState({NewActivityName:''})
        e.preventDefault();
    }
    NewActivityChange = e=>{
        this.setState({NewActivityName:e.target.value})
    }
    GetActivities = e=>{
        axios.get('/trackerapi/getactivitytypes').then(
            (res)=>{
                console.log(res)
                this.setState({ActivityTypes:res.data})
            }
        )
    }
    render(){
        console.log('User Activity component loadaed')
        return(
            <div className='ComponentCont'>
                <h4>Add to your activities!</h4>
                <ul className="list-group">
                    
                    {
                        this.state.ActivityTypes.map((activity,i)=>{
                            return <li className="list-group-item" key={i}>{activity.activitytype}</li>
                        })
                    }
                </ul>
                <form  className="form" onSubmit={this.Submit}>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="New Activity" aria-label="New Activity" aria-describedby="basic-addon1"
                value={this.state.NewActivityName}
                onChange={this.NewActivityChange}></input>
                <div className="input-group-append">
                    <button className="btn btn-outline-success" type="Submit" >Add  <FontAwesomeIcon icon={faPlusCircle} /> </button>
                </div>   
                </div>
                </form>
                
            </div>
        )
    }
}