import React from "react";
import "./useractivities.css";

import axios from 'axios'
import { connect } from "react-redux";
import { importTypes, newType } from '../../actions/activitiesActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'



class useractivities extends React.Component{
    constructor(props){
        super()
        this.state={
            NewActivityName:''
        }
        if(!props.types.length){
            props.importTypes()
        }
    }
    Submit = e=>{
        this.props.newType(this.state.NewActivityName)
        this.setState({NewActivityName:''})
        e.preventDefault();
    }
    NewActivityChange = e=>{
        this.setState({NewActivityName:e.target.value})
    }

    render(){
        console.log('User Activity component loadaed')
        return(
            <div className='ComponentCont'>
                <h4>Add to your activities!</h4>
                <ul className="list-group">
                    {
                        this.props.types.map((activity,i)=>{
                            return <li className="list-group-item" key={i}>
                                {activity.activitytype}
                                </li>
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

export default connect((state)=>({types:state.types}),{ importTypes, newType })(useractivities)
