import { useState } from "react"
import Movie from "./Movie"

export default function MovieLists({handleMovieDetails, movieLists}) {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className="bg-gray-700 h-screen p-4 rounded shadow">
            <div className="text-right">
                <button onClick={() => setIsOpen(toggle => !toggle)} className="cursor-pointer text-white font-bold">{isOpen ? 'X' : '+'}</button>
            </div>

            {
                isOpen && <ul className="flex flex-col gap-3">
                {movieLists && movieLists.map(movieList => <Movie key={movieList.imdbID} movieList={movieList} handleMovieDetails={handleMovieDetails} />)}
                </ul>
            }
        </div>
    )
}