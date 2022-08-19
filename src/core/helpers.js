export const renderChangePercent = (percent)=>{
    if(percent > 0){
        return <span className="percent-raised">{percent}%  &uarr;</span>
    }else if(percent < 0){
        return <span className="percent-fallen">{percent}%  &darr;</span>
    }
    return <span>{percent}% </span>
}
