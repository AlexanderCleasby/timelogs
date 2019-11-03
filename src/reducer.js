export default (state={activities:[],span:{start:'',end:''}},action)=>{
    switch (action.type){
        case "IMPORT_ACTIVITIES":
            return {activities:[...state.activities,...action.activities],span:action.span}
        case "NEW_ACTIVITY":
            return {activities:[...state.activities,action.activity]}
        default:
            return state
    }

}