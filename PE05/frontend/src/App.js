import React from 'react';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import RecipeListPage from './pages/RecipeListPage';
import RecipeDetailsPage from './pages/RecipeDetailsPage';
import AddRecipePage from './pages/AddRecipePage';
import EditRecipePage from './pages/EditRecipePage';
import './App.css'; // Bind external style rules globally

function Layout() {
  return (
    <div className="app-container">
      <nav className="global-nav">
        <Link to="/" className="nav-link">Recipe List</Link>
        <Link to="/add" className="nav-link">Add Recipe</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<RecipeListPage />}>
          <Route path="recipes/:id" element={<RecipeDetailsPage />} />
        </Route>
        <Route path="add" element={<AddRecipePage />} />
        <Route path="edit/:id" element={<EditRecipePage />} />
      </Route>
    </Routes>
  );
}