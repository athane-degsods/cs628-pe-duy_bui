import React, { createContext, useState, useContext } from 'react';

// Create the Context
const CitiesContext = createContext();

// Initial cities
const initialCities = [
    { id: 1, name: 'New York', country: 'USA', population: '6 million' },
    { id: 2, name: 'London', country: 'UK', population: '97 million' },
    { id: 3, name: 'Tokyo', country: 'Japan', population: '23 million' }
];

// Create the Provider component
function CitiesProvider({ children }) {
    const [cities, setCities] = useState(initialCities);

    // Function to add a new city
    const addCity = (newCity) => {
        setCities((prevCities) => [
            ...prevCities,
            { ...newCity, id: prevCities.length + 1 } // Simple ID generation
        ]);
    };

    return (
        <CitiesContext.Provider value={{ cities, addCity }}>
            {children}
        </CitiesContext.Provider>
    );
}

// Custom hook to use the CitiesContext
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error('useCities must be used within a CitiesProvider');
    }
    return context;
}

export { CitiesProvider, useCities };
