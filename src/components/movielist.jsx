import MovieCard from "./moviecard";

const MovieList = (props) =>{
    const movies = props.movies;

    return(
        <div className="movie-list">    
            {movies.map((movie) => {
                return <MovieCard key={movie.id} movie={movie} />;
            })}
        </div>
    )
};

export default MovieList;