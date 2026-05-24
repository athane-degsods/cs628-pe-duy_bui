import React, { Component } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import CitiesList from './CitiesList';
import AddCity from './AddCity';
import CityDetails from './CityDetails';

class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Cities List</Link>
            </li>
            <li>
              <Link to="/add">Add City</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<CitiesList />} />
              <Route path="/:cityId" element={<CityDetails />} />
            <Route exact path="/add" element={<AddCity />} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;