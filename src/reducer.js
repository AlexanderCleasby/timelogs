export default (state={activities:[],types:[],span:{start:'',end:''}},action)=>{
    switch (action.type){
        case "IMPORT_ACTIVITIES":
            return {...state,activities:[...state.activities,...action.activities],span:action.span}
        case "NEW_ACTIVITY":
            return {...state,activities:[...state.activities,action.activity]}
        case "IMPORT_TYPES":
            return {...state,types:action.types}
        case "NEW_TYPE":
            return {...state,types:[...state.types,action.activitytype]}
        default:
            return state
    }

}
