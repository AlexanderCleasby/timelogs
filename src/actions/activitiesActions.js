import { activityget, activityPost, activityTypeget, activityTypePost, activityTypeDelete } from "../api-requests";
import moment from "moment"

export function importActivities(end, lookback) {
    let start = end.clone().subtract(lookback, "day").startOf("day")
    let stateStart = moment(this.span.start)
    let stateEnd = moment(this.span.end)
    let requestEnd = end
    let requestStart = start
    if (this.span.start){
        requestEnd = stateStart.isBefore(end) && stateEnd.isAfter(end) ? stateStart : end
        requestStart = stateEnd.isAfter(start) && stateStart.isBefore(start) ? stateEnd : start  
        start = stateStart.isSameOrBefore(start) ? stateStart : start 
        end = stateEnd.isSameOrAfter(end) ? stateEnd : end
    }

    lookback=requestEnd.diff(requestStart,'days')
    console.table(
        { start:start.format(), end:end.format(),requestStart:requestStart.format(),requestEnd:requestEnd.format(),lookback:lookback }
    )

    return (dispatch) => activityget(requestEnd.year(), requestEnd.month(), requestEnd.date(), lookback)
        .then((activities) => dispatch({
            type: "IMPORT_ACTIVITIES",
            activities: activities,
            span: {
                start: start.format(),
                end: end.format()
            }
        }))
}

export function newEvent(activity) {
    return (dispatch) => activityPost(activity)
        .then((activity)=>dispatch({
            type:"NEW_ACTIVITY",
            activity:activity
        }))
}

export function importTypes(){
    return (dispatch) => activityTypeget()
        .then((types)=>dispatch({
            type:"IMPORT_TYPES",
            types:types
        }))
} 

export function newType(activitytype){
    return (dispatch) => activityTypePost(activitytype)
        .then((activitytype)=>dispatch({
            type:"NEW_TYPE",
            activitytype:activitytype
        }))
}

export function deleteType(id){
    return (dispatch) => activityTypeDelete(id)
        .then((id)=>dispatch({
            type:"DELETE_TYPE",
            id:id
    }))
    
}