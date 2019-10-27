import { activityget } from "../api-requests";

export const getActivities = (year,month,day,lookback)=>{
    return (dispatch)=>activityget(year,month,day,lookback)
        .then((activities)=>dispatch({type:"UPDATE_ACTIVITIES",activities:activities}))
}

