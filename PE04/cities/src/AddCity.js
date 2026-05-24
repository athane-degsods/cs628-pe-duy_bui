import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCities } from './CitiesContext';

function AddCity() {
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [population, setPopulation] = useState('');
    const { addCity } = useCities();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addCity({ name, country, population });
        navigate('/'); // Redirect to the cities list
    };

    return (
        <div>
            <h1>Add City</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cityName">City Name:</label>
                    <input
                        type="text"
                        id="cityName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="population">Population:</label>
                    <input
                        type="text"
id="population"
                        value={population}
                        onChange={(e) => setPopulation(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Add City</button>
            </form>
        </div>
    );
}

export default AddCity;