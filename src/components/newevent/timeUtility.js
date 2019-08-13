import React from 'react'

export const numoptions = (num,start,padInner)=>{
    if(start==null){
        start=1
    }
    let ops=[]
    if(padInner){
        for(let i=start;i<num+start;i++){
            ops.push(<option value={i.toString().padStart(num.toString().length,'0')} key={i} >{i.toString().padStart(num.toString().length,'0')}</option>)
    }}
    else{
        for(let i=start;i<num+start;i++){
            ops.push(<option value={i.toString().padStart(num.toString().length,'0')} key={i} >{i}</option>)
    }}
    return ops
}
export const TimeConvert = (year,month,day,hour,min,AMPM)=>{
    
    month=parseInt(month,10)-1
    hour=parseInt(hour,10)
    if(hour==12){
        hour=0
    }
    if(AMPM=='PM'){
        hour=hour+12
    }
    return new Date(parseInt(year,10),month,parseInt(day,10),hour,parseInt(min,10))
}