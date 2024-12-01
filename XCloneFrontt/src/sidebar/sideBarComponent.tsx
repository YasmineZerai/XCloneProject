import { ReactNode } from "react";

// 

export default function SideBarComponent({ children }: { children: ReactNode }){
    return (<>
    <button className=" text-white text-2xl rounded-full  w-1/3 h-14 flex items-center justify-center hover:bg-stone-900">
     {children}
    </button>
    </>)
}