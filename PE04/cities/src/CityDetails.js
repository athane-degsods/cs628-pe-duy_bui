import React from 'react';
import { useParams } from 'react-router-dom';
import { useCities } from './CitiesContext';

function CityDetails() {
    const { cityId } = useParams();
    const { cities } = useCities();
    const city = cities.find(c => c.id === parseInt(cityId));

    if (!city) {
        return <div>City not found</div>;
    }

    return (
        <div>
            <h3>{city.name}</h3>
            <p><strong>Country:</strong> {city.country}</p>
            <p><strong>Population:</strong> {city.population}</p>
        </div>
    );
}

export default CityDetails;
