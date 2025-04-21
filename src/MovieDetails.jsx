export default function MovieDetails({movieDetails}) {

    const {Poster, Title, Year} = movieDetails;

    return (
        <div className="bg-gray-700 h-screen p-4 rounded shadow">
            <img src={Poster} alt={Title} />
            <div className="details-info">
                <h4>{Title}</h4>
                <p>{Year}</p>
            </div>
        </div>
    )
}