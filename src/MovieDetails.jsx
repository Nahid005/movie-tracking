import { IoIosArrowRoundBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

import { useEffect, useState } from "react";
import Rating from "./Rating";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({selectedId, apiKey, onAddWatchedMovie, onCloseMovieDetails, watchedMovieList}) {

    const [movieDetails, setMovieDetails] = useState({});
    const [userRating, setUserRating] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState("");

    const {Poster:poster, Title:title, Year:year, Actors:actors, Director:director, Genre:genre, Released:released, Runtime:runtime, Plot:plot, imdbRating} = movieDetails;

    const alreadyWatched = watchedMovieList.map(movie => movie.imdbId).includes(selectedId)

    useEffect(() => {
        async function selectedMovie() {
            try {
                setIsError(true);
                setIsError("")
                const response = await fetch(`https://corsproxy.io/?http://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`);
                if(!response.ok) throw new Error("Network error: Failed to fetch data")

                const data = await response.json();
                setMovieDetails(data)

            } catch(error) {
                setIsError(error.message)
            } finally {
                setIsloading(false)
            }
        }

        selectedMovie();
    }, [selectedId])

    function handleWatchdMovie() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            runtime,
            poster,
            imdbRating,
            userRating,
        }

        onAddWatchedMovie(newWatchedMovie);
    }

    function handleUserRating(rating) {
        setUserRating(rating);
    }

    return (
        <>
            {
                isLoading && <Loading />
            }
            <div className="bg-gray-700 h-screen p-4 rounded shadow">
                <button onClick={onCloseMovieDetails} className="btn absolute bg-purple-800 p-1 w-8 h-8 rounded-full cursor-pointer text-white text-center text-lg shadow"><IoIosArrowRoundBack /></button>
                <div className="grid grid-cols-2 gap-2 ">
                    <div className="poster">
                        <img src={poster} alt={title} />
                    </div>
                    <div className="movie-info">
                        <h4 className="font-bold text-white text-xl mb-2">{title}</h4>
                        <p className="text-white my-1"><strong>Actors:</strong> {actors}</p>
                        <p className="text-white my-1"><strong>Director:</strong> {director}</p>
                        <p className="text-white my-1"><strong>Released Date:</strong> {released}</p>
                        <p className="text-white my-1"><strong>Run Time:</strong> {runtime}</p>
                        <p className="text-white my-1"><strong>Genre:</strong> {genre}</p>
                    </div>
                </div>
                <div className="my-4 bg-gray-600 p-4 rounded text-center">
                    {
                        alreadyWatched ? <p> You already watched this movie </p> : <>
                        <Rating onAddUserRating={handleUserRating} />
                        {
                            userRating > 0 ? <div className="flex justify-center">
                            <button onClick={handleWatchdMovie} className="bg-amber-500 text-gray font-semibold text-center p-3 rounded shadow mt-4 flex items-center gap-1"> <FaPlus /> Add watched list</button>
                            </div> : ''
                        }
                        </>
                    }
                    
                    
                </div>
                <div className="details-info">
                    <p className="text-white italic">{plot}</p>
                </div>
            </div>
            {
                isError && <ErrorMessage message={isError} />
            }
        </>
    )
}