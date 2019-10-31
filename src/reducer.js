export default (state={activities:[],span:{start:'',end:''}},action)=>{
    switch (action.type){
        case "IMPORT_ACTIVITIES":
            return {activities:action.activities,span:action.span}
        case "ADD_ACTIVITIES":
            return []
        default:
            return state
    }

}