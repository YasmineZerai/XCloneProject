import EmojiIcon from "../icons/postIcons/emojiIcon";
import GifIcon from "../icons/postIcons/gifIcon";
import ImageIcon from "../icons/postIcons/imageIcon";
import LocationIcon from "../icons/postIcons/locationIcon";

export default function Post(){
return(<div className="p-6 w-full  bg-inherit  rounded-lg shadow-md flex flex-col  gap-2 h-fit border-b border-stone-900">
    <div className="flex w-full">
      <div
        className="w-12 h-12 rounded-full bg-cover bg-center" style={{backgroundImage:`url('/src/pics/picture.jpg')`}}
      ></div>
      <textarea
        className=" pl-4 text-xl w-full p-2 bg-inherit rounded-lg focus:outline-none text-white "
        rows={3}
        placeholder="What's on your mind?"
      />
      </div>
      <div className="w-full flex justify-between px-6">
        <div className="flex gap-2 text-cyan-500">
            <ImageIcon/>
            <GifIcon/>
            <EmojiIcon/>
            <LocationIcon/>
        </div>
      <button
        className="px-4 py-2 text-white  bg-cyan-500 rounded-lg hover:bg-cyan-600 focus:outline-none w-20 text-center"
         // Disable if there's no content
      >
        Publish
      </button>
      </div>
    </div>
  )
};
