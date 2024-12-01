import HomeIcon from "../icons/sideBarIcons/homeIcon";
import MessageIcon from "../icons/sideBarIcons/messageIcon";
import NotificationIcon from "../icons/sideBarIcons/notificationIcon";
import PostIcon from "../icons/sideBarIcons/postIcon";
import ProfileIcon from "../icons/sideBarIcons/profileIcon";
import SearchIcon from "../icons/sideBarIcons/searchIcon";
import XIcon from "../icons/sideBarIcons/xIcon";
import SideBarComponent from "./sideBarComponent";
export default function SideBar(){
    return(<div className="bg-black fixed top-0 left-0 h-screen border-r border-stone-900  w-1/6 flex flex-col items-end justify-start pt-2 pr-6">
        <SideBarComponent>
            <XIcon/>
        </SideBarComponent>
        <SideBarComponent>
            <HomeIcon/>
        </SideBarComponent>
        <SideBarComponent>
            <SearchIcon/>
        </SideBarComponent>
        <SideBarComponent>
            <NotificationIcon/>
        </SideBarComponent>
        <SideBarComponent>
            <MessageIcon/>
        </SideBarComponent>
        <SideBarComponent>
            <ProfileIcon/>
        </SideBarComponent>
        <SideBarComponent>
            <PostIcon/>
        </SideBarComponent>
    </div>)
}