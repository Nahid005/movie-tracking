import { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineVideoChat } from "react-icons/md";
import WatchedMovie from "./WatchedMovie";

export default function WatchedMovieLists({watchedMovieList, onDeleteList, totalImdbRating, totalUserRating, totalWatchedTime, totalWatchedMovie}) {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="bg-gray-700 h-screen p-4 rounded shadow">
            <div className="text-right">
                <button onClick={() => setIsOpen(toggle => !toggle)} className="cursor-pointer text-white font-bold">{isOpen ? 'X' : '+'}</button>
            </div>
            <div className="bg-gray-600 p-3 rounded-md shadow my-2">
                <h4 className="text-white mb-2 font-bold text-xl">Movies you watched</h4>
                <ul className="grid grid-cols-4 gap-1 text-center">
                    <li className="flex items-center justify-center flex-col text-center text-white"><MdOutlineVideoChat /> {totalWatchedMovie} Movies</li>
                    <li className="flex items-center justify-center flex-col text-center text-white"><FaStar /> {totalImdbRating}</li>
                    <li className="flex items-center justify-center flex-col text-center text-white"><FaStar /> {totalUserRating}</li>
                    <li className="flex items-center justify-center flex-col text-center text-white"><GiSandsOfTime /> {totalWatchedTime} min</li>
                </ul>
            </div>
    
            {
            isOpen && <ul className="flex flex-col gap-3">
                {watchedMovieList.map(movieList => <WatchedMovie key={movieList.imdbId} movieList={movieList} onDeleteList={onDeleteList}  />)}
            </ul>
            }
    
        </div>
    )
  }