import React from 'react';
import { useParams } from 'react-router-dom';

function CityDetails() {
    const { cityName } = useParams();
    
    return (
        <div>
            <h1>{cityName.replace('-', ' ').toUpperCase()}</h1>
            <p>This is the details page for {cityName.replace('-', ' ').toUpperCase()}.</p>
        </div>
    );
}

export default CityDetails;