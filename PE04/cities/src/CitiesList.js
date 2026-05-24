import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useCities } from './CitiesContext';

function CitiesList() {
    const { cities } = useCities();

    return (
        <div>
            <h1>Cities List</h1>
            <ul>
                {cities.map((city) => (
                    <li key={city.id}>
                        <Link to={`/${city.id}`}>
                            {city.name}
                        </Link>
                    </li>
                ))}
            </ul>
            <Outlet />
        </div>
    );
}

export default CitiesList;