import axios from 'axios'

export function activityget(year,month,day,lookback){
    return new Promise((resolve,reject)=>{axios.get('trackerapi/getactivities?year='+year+'&month='+month+'&day='+day+'&lookback='+lookback).then(
        (res)=>{
            resolve(res.data)
        }
    )
}
)}

