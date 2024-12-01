import {useContext } from "react"
import { timeLineContext } from "../contexts/timeLineContext";
type TimelineHeaderComponentProps = {
    text: string;
    handleClick : ()=> void
}

export default function TimelineHeaderComponent({text, handleClick} :TimelineHeaderComponentProps){
    const context =useContext(timeLineContext)
    const clicked : boolean = context.timeLine===text

    return(
        <button className={!clicked?"text-center text-white border-b border-stone-900 w-1/2 h-12 pt-2 hover:bg-stone-900 font-bold ":"text-center text-white border-b border-stone-900 w-1/2 h-12 pt-2 hover:bg-stone-900 font-bold underline decoration-4 decoration-solid decoration-cyan-600 underline-offset-8"} onClick={handleClick}>{text}</button>
   )
}