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
