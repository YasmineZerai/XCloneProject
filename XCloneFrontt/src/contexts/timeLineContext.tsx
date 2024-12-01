import { createContext, useState, PropsWithChildren } from "react"
interface TimeLineContextType {
    timeLine: string;
    GoToFollowing: () => void;
    GoToForYou: () => void;
  }
  const defaultContextValue: TimeLineContextType = {
    timeLine: "ForYou",
    GoToFollowing: () => {},
    GoToForYou: () => {},
  };
export const timeLineContext = createContext<TimeLineContextType>(defaultContextValue);
export function TimeLineContextProvider({children}:PropsWithChildren){
    const [timeLine, setTimeLine]=useState("ForYou")
    const GoToFollowing: ()=>void =()=>setTimeLine("Following")
    const GoToForYou : ()=>void =()=>setTimeLine("ForYou")
    const store={timeLine, GoToFollowing,GoToForYou }
    return(<timeLineContext.Provider value={store}>
        {children}
    </timeLineContext.Provider>)
}
