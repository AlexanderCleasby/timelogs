export default (state={activities:[]},action)=>{
    switch (action.type){
        case "UPDATE_ACTIVITIES":
            return {activities:action.activities}
        case "ADD_ACTIVITIES":
            return []
        default:
            return state
    }

}