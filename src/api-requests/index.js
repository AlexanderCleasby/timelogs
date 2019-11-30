import axios from 'axios'

export function activityget(year,month,day,lookback,loggedin){
    
    return new Promise((resolve,reject)=>{axios.get(`trackerapi/getactivities?year=${year}&month=${month}&day=${day}${lookback !==0 ? `&lookback=${lookback}` : '' }`).then(
        (res)=>{
            resolve(res.data)
        }
    )}
)}

export function activityPost(event) {
    return new Promise((resolve, reject) => {
        axios.post('/trackerapi/newactivity', event).then(
            (res) => {
                resolve(res.data)
            }
        )
    })
}

export function activityTypeget(){
    return new Promise((resolve) => {
        axios.get('/trackerapi/getactivitytypes').then(
            (res) => resolve(res.data)
        )
    })
}
