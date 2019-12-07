import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { importTypes, newType, deleteType } from '../../actions/activitiesActions'
import ActivityTypeItem from './activityTypeItem'
import "./useractivities.scss";



class useractivities extends React.Component{
    constructor(props){
        super()
        this.state={
            NewActivityName:'',
            deleteId:''
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
    deleteIdChange = (id)=>{
        this.setState({deleteId:id})
    }
    delete = ()=>this.props.deleteType(this.state.deleteId)
    //console.log(this.props.types.find((type)=>type._id===this.state.deleteId))
     
    render(){
        return(
            <div className='ComponentCont'>
                <h4>Add to your activities!</h4>
                <ul className="list-group">
                    
                        {this.props.types.map((activity,i)=><ActivityTypeItem key={i} {...activity}  deleteIdChange={this.deleteIdChange} expanded={this.state.deleteId===activity._id} deleteType={this.delete} />)}
                    
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

export default connect((state)=>({types:state.types}),{ importTypes, newType, deleteType })(useractivities)
