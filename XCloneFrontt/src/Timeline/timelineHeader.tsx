
import TimelineHeaderComponent from "./timelineHeaderComponent";
import { useContext } from "react";
import { timeLineContext } from "../contexts/timeLineContext";
export default function TimelineHeader(){
    const context =useContext(timeLineContext)
    return(<div className="flex flex-row">
        <TimelineHeaderComponent text="ForYou" handleClick={context.GoToForYou} />
        <TimelineHeaderComponent text="Following" handleClick={context.GoToFollowing}/>
    </div>)
}