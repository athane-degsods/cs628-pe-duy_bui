from nbconvert import export

sample_movie_list = [
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
];

export(sample_movie_list, 'json')