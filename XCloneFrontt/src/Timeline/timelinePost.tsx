import CommentIcon from "../icons/postIcons/commentIcon";
import DotIcon from "../icons/postIcons/dotIcon";
import HeartIcon from "../icons/postIcons/heartIcon";
import RepostIcon from "../icons/postIcons/repostIcon";
import RetweetIcon from "../icons/postIcons/retweetIcon";
import SaveIcon from "../icons/postIcons/saveIcon";
import ViewsIcon from "../icons/postIcons/viewsIcon";

export default function TimelinePost(){
    return (<div className="w-full h-screen max-h-max flex justify-start p-6 gap-3 border-b border-stone-900">
         <div
        className="w-12 h-12 rounded-full bg-cover bg-center" style={{backgroundImage:`url('/src/pics/picture.jpg')`}}
      ></div>
      <div className="flex flex-col justify-start gap-2 w-11/12">
        <div className="text-white flex items-center font-bold text-lg gap-2">
            <p>Yasmine Zerai</p>
            <p className="text-gray-600 font-normal">@Yass</p>
            <span className="text-gray-600"><DotIcon/></span>
            <p className="text-gray-600 font-normal"> 15 Oct</p>
            
            
        </div>
        <p className="text-white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum iste explicabo excepturi alias tempore facilis, esse pariatur voluptatibus quibusdam itaque! Sunt dolores voluptatibus dignissimos voluptate neque a aspernatur recusandae atque!</p>
        <div
        className="w-11/12 h-screen bg-no-repeat rounded-md border border-stone-900 bg-contain bg-center" style={{backgroundImage:`url('/src/pics/picture.jpg')`}}
      ></div>
      <div className="flex justify-evenly">
        <div className="flex text-gray-600 items-center">
            <CommentIcon/>
            <p>10</p>
        </div>
        <div className="flex text-gray-600 items-center">
            <RetweetIcon/>
            <p>10</p>
        </div>
        <div className="flex text-gray-600 items-center">
            <HeartIcon/>
            <p>10</p>
        </div>
        <div className="flex text-gray-600 items-center">
            <ViewsIcon/>
            <p>10</p>
        </div>
        <div className="flex text-gray-600 items-center">
            <SaveIcon/>
            <RepostIcon/>
        </div>
      </div>

      </div>
    </div>)
}