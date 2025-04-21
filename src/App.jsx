import { useEffect, useState } from "react";
import MovieDetails from "./MovieDetails";
import MovieLists from "./MovieLists";
import Navbar from "./Navbar";
import WatchedMovieLists from "./WatchedMovieLists";
import Logo from "./Logo";
import SearchBox from "./SearchBox";
import SearchResult from "./SearchResult";
import Box from "./Box";
import Rating from "./Rating";

const apiKey = "77707b8f";

function App() {
  const [movieLists, setMovieLists] = useState([]);
  const [movieDetails, setMovieDetails] = useState(null);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true)
        const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
        const data = await response.json();

        if(!data.Search) throw new Error("Data not found") 

        setMovieLists(data.Search)

      } catch(error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    getData();

  }, [query])


  function handleSearch(data) {
    setQuery(data)
  }

  function handleMovieDetails(movie) {
    setMovieDetails(movie)
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
              movieLists ? <MovieLists 
                handleMovieDetails={handleMovieDetails} 
                movieLists={movieLists}
              /> : <p>please search your favorite movie</p>
            }
          </Box>

          <Box>
            {
              movieDetails ? <MovieDetails movieDetails={movieDetails} /> : <WatchedMovieLists />
            }
          </Box>
          <Rating maxLength={5} />
        </main>
      </div>
    </div>
  );
}

export default App;
