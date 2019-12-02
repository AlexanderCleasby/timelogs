import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const DeleteControls = ({expanded, id,  deleteIdChange})=>{
    if(expanded){
        return <>
            <button className={"btn btn-success btn-sm deleteControl"}>
                <FontAwesomeIcon icon={faCheck} />
            </button>
            <button className={"btn btn-danger btn-sm deleteControl"}>
                <FontAwesomeIcon icon={faTimes} />
            </button>
        </>
    }
    else{
        return <button className={"btn btn-danger btn-sm deleteControl"} onClick={()=>deleteIdChange(id)}>
                <FontAwesomeIcon icon={faTrash}  />
            </button>
    }
}

const ActivityTypeItem = ({activitytype, _id, expanded,  deleteIdChange})=>(
    <div className="list-group-item">
        {activitytype}
        <DeleteControls expanded={expanded} id={_id}  deleteIdChange={deleteIdChange} />
    </div>)

export default ActivityTypeItem