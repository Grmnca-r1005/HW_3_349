const MovieCard = (props) => {
    const movie = props.movie;

    return (
        <div className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} />
            <h2>{movie.title}</h2>
            <p>{movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
        </div>
    );
}

export default MovieCard;
