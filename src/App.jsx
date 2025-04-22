import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import MovieLists from "./MovieLists";

import MovieDetails from "./MovieDetails";
import WatchedMovieLists from "./WatchedMovieLists";
import Box from "./Box";
import Rating from "./Rating";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const apiKey = "77707b8f";

function App() {

  const [movieLists, setMovieLists] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [watchedMovieList, setWatchedMovieList] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");


  useEffect(() => {
    async function getMovieData() {
      try {
        setIsLoading(true);
        setIsError("");
        
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
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

  }, [query])

  function handleSearch(data) {
    setQuery(data);
  }

  function handleMovieDetails(id) {
    setSelectedId(id);
  }

  function handleWatchedListMovie(newMovie) {
    setWatchedMovieList(movie => [...movie, newMovie]);
    handleColseMovieDetails();
  }

  function handleColseMovieDetails() {
    setSelectedId(null);
  }

  function handleDeleteMovie(id) {
    const remainingData = watchedMovieList.filter(movie => movie.imdbId !== id);
    setWatchedMovieList(remainingData);
  }
 

  return (
    <div className="bg-gray-900 h-screen py-10">
      <div className="container mx-auto">
        <Navbar> 
          <Logo />
          <SearchBox onHandleSearch={handleSearch} />
          <SearchResult movieLists={movieLists} />
        </Navbar>

        <main className="grid grid-cols-2 gap-2 p-4">
          <Box>
            {
              isLoading && <Loading />
            }

            {
              !isLoading && !isError && <MovieLists 
                handleMovieDetails={handleMovieDetails} 
                movieLists={movieLists}
              /> 
            }

            {
              isError && <ErrorMessage message={isError} />
            }

          </Box>

          <Box>
            {
              selectedId ? <MovieDetails selectedId={selectedId} apiKey={apiKey} onAddWatchedMovie={handleWatchedListMovie} onCloseMovieDetails={handleColseMovieDetails}  /> : <WatchedMovieLists watchedMovieList={watchedMovieList} onDeleteList={handleDeleteMovie} />
            }
          </Box>
        </main>
      </div>
    </div>
  );

}

export default App;