import { IoStar } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import { TiDeleteOutline } from "react-icons/ti";

export default function WatchedMovie({movieList, onDeleteList}) {
    
    const {poster, imdbRating, userRating, title, runtime, imdbId} = movieList;

    return (
        <li className="flex gap-2 justify-start border-b-1 border-b-gray-600 pb-2">
            <img className="w-12" src={poster} alt={title} />
            <div className="flex flex-col gap-1">
                <h4 className="text-white font-semibold mb-2">{title}</h4>
                <div className="flex gap-4 items-center">
                    <span className="flex items-center text-white gap-1 font-semibold"><IoStar /> {imdbRating}</span>
                    <span className="flex items-center text-white gap-1 font-semibold"><IoStar /> {userRating}</span>
                    <span className="flex items-center text-white gap-1 font-semibold"><MdOutlineTimer /> {runtime}</span>
                </div>
            </div>
            <button onClick={() => onDeleteList(imdbId)} className="text-red-700 text-xl cursor-pointer text-right"><TiDeleteOutline/></button>
        </li>
    )
}