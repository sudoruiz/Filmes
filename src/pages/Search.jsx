import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import './MoviesGrid.css';

const searchURL = import.meta.env.VITE_SEARCH
const apikey = import.meta.env.VITE_API_KEY

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies, setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchedMovies = async (url) => {
        try {
            const res = await fetch(url);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Failed to fetch movies:', error);
        }
    };

    useEffect(() => {
        console.log('Query:', query);
        const searchWithQueryURL = `${searchURL}?api_key=${apikey}&query=${query}`;
        console.log('URL:', searchWithQueryURL);
        getSearchedMovies(searchWithQueryURL);
    }, [query]);

    return (
        <div className="container">
            <h2 className="title">
                <span className="query-text">{query}</span>
            </h2>
            <div className="movies-container">
                {movies.length === 0 && <p>Carregando...</p>}
                {movies.length > 0 && 
                movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
            </div>
        </div>
    );
};

export default Search;
