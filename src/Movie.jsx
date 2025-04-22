export default function Movie({movieList, handleMovieDetails}) {

    const {Title, Year, Poster, imdbID} = movieList;
  
    return(
        <li onClick={() => handleMovieDetails(imdbID)} className="flex gap-2 border-b-1 border-b-gray-600 pb-2">
            <img className="w-12" src={Poster} alt={Title} />
            <div className="flex flex-col gap-1">
                <h4 className="text-white font-semibold mb-2">{Title}</h4>
                <span className="text-white ">📅 {Year}</span>
            </div>
        </li>
    )
  }