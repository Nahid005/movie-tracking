import { useEffect, useState } from "react";
import Rating from "./Rating";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

export default function MovieDetails({selectedId, apiKey}) {

    const [movieDetails, setMovieDetails] = useState(null)
    const [isLoading, setIsloading] = useState(false);
    const [isError, setIsError] = useState("");

    const {Poster, Title, Year} = movieDetails;

    useEffect(() => {
        async function selectedMovie() {
            try {
                setIsError(true);
                const response = await fetch(`http://www.omdbapi.com/?i=${selectedId}&apikey=${apiKey}`);
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

    return (
        <>
            {
                isLoading && <Loading />
            }
            <div className="bg-gray-700 h-screen p-4 rounded shadow">
                <img src={Poster} alt={Title} />
                <h4 className="font-bold text-white text-xl my-2">{Title}</h4>
                <Rating />
                <div className="details-info">
                    <p>{Year}</p>
                </div>
            </div>
            {
                isError && <ErrorMessage message={isError} />
            }
        </>
    )
}