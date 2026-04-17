import './App.css';
import { useState } from 'react';

const sample_movie_list = [
  {
      "id": 1,
      "title": "The Shawshank Redemption",
      "director": "Frank Darabont",
      "release_year": 1994,
      "genre": "Drama",
      "rating": 9.3
  },
  {
      "id": 2,
      "title": "The Godfather",
      "director": "Francis Ford Coppola",
      "release_year": 1972,
      "genre": "Crime",
      "rating": 9.2
  },
  {
      "id": 3,
      "title": "The Dark Knight",
      "director": "Christopher Nolan",
      "release_year": 2008,
      "genre": "Action",
      "rating": 9.0
  }
]

function MovieCard({ movie }) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Release Year: {movie.release_year}</p>
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
    </div>
  )
}

function MovieList({ movies }) {
  return (
    <div>
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

function App() {
  const [genreLabel, setGenreLabel] = useState('All Genres');

  return (
    <div className="App">
      <h1>Movie List</h1>
      <button onClick={() => setGenreLabel('All Genres')}>{genreLabel}</button>
      <MovieList movies={sample_movie_list} />
    </div>
  )
}

export default App;