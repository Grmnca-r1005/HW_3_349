import { useEffect, useState } from "react";
import MovieList from "./components/movielist";
import "./App.css";

function App() {

  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const sortedMovies = [...movies].sort((a, b) => {
    if (sortBy === "date-asc") {
        return new Date(a.release_date) - new Date(b.release_date);
    }

    if (sortBy === "date-desc") {
        return new Date(b.release_date) - new Date(a.release_date);
    }

    if (sortBy === "rating-asc") {
        return a.vote_average - b.vote_average;
    }

    if (sortBy === "rating-desc") {
        return b.vote_average - a.vote_average;
    }

    return 0;
  });

  const api_key = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=1`;

  useEffect(() => {
    const fetchMovies = async () => {
      try 
      {

        let url="";

        if (search.trim() !== "") {
            url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(search)}&language=en-US&page=${page}`;
        } else {
            url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
        }

        const response = await fetch(url,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
                accept: "application/json"
              }
            }
          );

        if (!response.ok) {
            throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages)
        } catch (error) {
            setError(error.message);
          }
        };

        fetchMovies();
    }, [search, page]);

    if (error) {
        return <p>Error: {error}</p>;
    } 

  return (
    <div>
      <header id="header"> <h1>Popular Movies</h1></header>

      <div id="search-container">
        <input id="search-input" type="text" placeholder="Search movies..." value={search} onChange={(event) => {setSearch(event.target.value); setPage(1)} }/>
        <select id="sort" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="popularity">Popular</option>
          <option value="date-asc">Release Date (Oldest First)</option>
          <option value="date-desc">Release Date (Newest First)</option>
          <option value="rating-asc">Rating (Lowest First)</option>
          <option value="rating-desc">Rating (Highest First)</option>
        </select>
      </div>

      <main id="main">
        <MovieList movies={sortedMovies} />
      </main>

      <footer id="footer">
        <button id="previous" onClick={() => setPage(page-1)} disabled={page === 1}>Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button id="next" onClick={() => setPage(page+1)} disabled={page === totalPages}>Next</button>
      </footer>
    </div>
  );
}

  


export default App;

