import { useEffect, useState } from "react";
import Movie from "./Movie";
import { FaStar } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";
import { MdOutlineVideoChat } from "react-icons/md";

export default function WatchedMovieLists() {

    const [watchedMovieList, setWatchedMovieList] = useState([]);
    const [isOpen, setIsOpen] = useState(true)

    useEffect(() => {

        fetch('tempWatchedData.json')
        .then((res) => res.json())
        .then((data) => setWatchedMovieList(data))

    }, [])

    return (
        <div className="bg-gray-700 h-screen p-4 rounded shadow">
            <div className="text-right">
                <button onClick={() => setIsOpen(toggle => !toggle)} className="cursor-pointer text-white font-bold">{isOpen ? 'X' : '+'}</button>
            </div>
            <div className="bg-gray-600 p-3 rounded-md shadow my-2">
                <h4 className="text-white mb-2 font-bold text-xl">Movies you watched</h4>
                <ul className="grid grid-cols-4 gap-1 text-center">
                    <li className="flex items-center justify-center flex-col text-center text-white"><MdOutlineVideoChat /> 0 Movies</li>
                    <li className="flex items-center justify-center flex-col text-center text-white"><FaStar /> 0.0</li>
                    <li className="flex items-center justify-center flex-col text-center text-white"><FaStar /> 0.0</li>
                    <li className="flex items-center justify-center flex-col text-center text-white"><GiSandsOfTime /> 0 min</li>
                </ul>
            </div>
    
            {
            isOpen && <ul className="flex flex-col gap-3">
                {watchedMovieList.map(movieList => <Movie key={movieList.imdbID} movieList={movieList}  />)}
            </ul>
            }
    
        </div>
    )
  }