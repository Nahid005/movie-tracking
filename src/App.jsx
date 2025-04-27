import { useState } from "react";

import Navbar from "./Navbar";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import MovieLists from "./MovieLists";
import MovieDetails from "./MovieDetails";
import WatchedMovieLists from "./WatchedMovieLists";
import Box from "./Box";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import useMovie from "./useMovie";
import useLocalStorage from "./useLocalStorage";

const apiKey = "77707b8f";

function App() {

  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const {movieLists, isError, isLoading} = useMovie(apiKey, query);
  const [watchedMovieList, setWatchedMovieList] = useLocalStorage([], 'watched');

  const totalWatchedMovie = watchedMovieList.length;
  let totalImdbRating = 0;
  watchedMovieList.map(movie => Math.round(totalImdbRating += Number(movie.imdbRating)))
  let totalUserRating = 0;
  watchedMovieList.map(movie => Math.round(totalUserRating += Number(movie.userRating)))
  let totalWatchedTime = 0;
  watchedMovieList.map(movie => Math.round(totalWatchedTime += Number(movie.runtime?.split(' ').at(0))))

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
    <div className="bg-gray-900 py-10">
      <div className="container mx-auto">
        <Navbar> 
          <Logo />
          <SearchBox onHandleSearch={handleSearch} setQuery={setQuery} />
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
              selectedId ? <MovieDetails 
                selectedId={selectedId} 
                apiKey={apiKey} 
                onAddWatchedMovie={handleWatchedListMovie} onCloseMovieDetails={handleColseMovieDetails} watchedMovieList={watchedMovieList}  
              /> : <WatchedMovieLists 
              watchedMovieList={watchedMovieList} 
              onDeleteList={handleDeleteMovie} 
              totalImdbRating={totalImdbRating} 
              totalUserRating={totalUserRating} 
              totalWatchedTime={totalWatchedTime} 
              totalWatchedMovie={totalWatchedMovie} />
            }
          </Box>
        </main>
      </div>
    </div>
  );

}

export default App;