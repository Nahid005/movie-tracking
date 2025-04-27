import { useEffect, useState } from "react";

export default function useMovie(apiKey, query) {

    const [movieLists, setMovieLists] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState("");

    useEffect(() => {
        const controller = new AbortController();
            async function getMovieData() {
            try {
            setIsLoading(true);
            setIsError("");
            
            const response = await fetch(`https://corsproxy.io/?http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`, {signal: controller.signal});
            if (!response.ok) {
                throw new Error("Network error: Failed to fetch data 💔 ");
            }

            const data = await response.json();
            if (data.Response === "False") {
                throw new Error("No movies found for this query 🥪 ");
            }

            setMovieLists(data.Search);
        } catch(error) {
            setIsError(error.message);
        } finally {
            setIsLoading(false)
        }
    }

    if(query.length < 3) {
        setMovieLists([]);
        setIsError("Search Your Favourite Movie 😻 ");

        return
    }

    getMovieData();

    return function () {
        controller.abort();
    }

    }, [query])

    return {movieLists, isError, isLoading}
}