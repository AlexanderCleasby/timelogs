import { activityget } from "../api-requests";
import moment from "moment"

export function importActivities(end, lookback) {
    
    let start = end.clone().subtract(lookback, "day")
    if (!this.span.start){
        start = moment(this.span.start).isAfter(start) ? moment(this.span.start) : start 
        end = moment(this.span.end).isBefore(end) ? moment(this.span.end) : end
    }
    console.log(end.day())
    return (dispatch) => activityget(end.year(), end.month(), end.date(), lookback)
        .then((activities) => dispatch({
            type: "IMPORT_ACTIVITIES",
            activities: activities,
            span: {
                start: start.format(),
                end: end.format()
            }
        }))
}
