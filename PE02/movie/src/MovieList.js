// 1. Set up a react application using `create-react-app`.
import { useState } from 'react';
import './MovieList.css';

// 7. Use JSX syntax to write the component markup and JSX expressions for dynamic data rendering.


// 4.a. Render the list of movies.
function ListofMovies(props) {
    const movies = props.movies;
    return (
        <div>
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

// 4.b. Display each movie in a movie card.
function MovieCard(props) {
    const movie = props.movie;
    return (
        <div className="movie-card"
            onClick={() => alert(`You clicked on ${movie.title}`)} 
        > {/* 6. Display an alert when the user click on a movie */}
            <h3>{movie.title}</h3>
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.release_year}</p>
        </div>
    );
}


// 2. Create a MovieList Component that will be the main component of my application.
function MovieList(props) {
    // 3. Create an array of movie objects in MovieList component, having title, genre, and release year properties.
    // 8.a. Use stateful component to manage the movie list
    const [movies, setMovies] = useState([
        { id: 1, title: 'The Shawshank Redemption', genre: 'Drama', release_year: 1994},
        { id: 2, title: 'The Godfather', genre: 'Crime', release_year: 1972},
        { id: 3, title: 'The Dark Knight', genre: 'Action', release_year: 2008},
        { id: 4, title: 'Pulp Fiction', genre: 'Crime', release_year: 1994},
        { id: 5, title: 'The Lord of the Rings: The Return of the King', genre: 'Fantasy', release_year: 2003},
    ]);

    // 8.b. Use stateful component to manage the selected genre for filtering the movie list.
    // 9. Use the useState hook to manage the state of the selected genre.
    const [genre, setGenre] = useState('All Genres');
    const genres = ['All Genres', ...new Set(movies.map(movie => movie.genre).sort())];

    // 5.b. Filtered list of movie after "genre" state is changed by the user.
    const filteredMovies =
    genre === 'All Genres'
        ? movies
        : movies.filter((movie) => movie.genre === genre);

    return (
        <div>   
            <h2>Movie List</h2> {/* The title component */}
            <select
                value={genre}
                onChange={(e) => 
                    {
                        setGenre(e.target.value)
                        console.log("Genre is: ", e.target.value)
                    }
                }
            >
                {genres.map(g => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select> {/* 5.a. The filter dropdown component. */}
            <ListofMovies movies={filteredMovies} /> {/* The list of movies component */}
        </div>
    );
}

// 10.a. Export the MovieList component as the default export of the module.
export default MovieList;