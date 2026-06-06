import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP network error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Querying database collections...</div>;
  if (error) return <div className="btn-danger" style={{ padding: '10px' }}>Error: {error}</div>;

  return (
    <div className="split-layout">
      <div className="left-column">
        <h2 className="page-title">Recipe Directory</h2>
        {recipes.length === 0 ? (
          <p>No records found in database collection.</p>
        ) : (
          <ul className="recipe-list">
            {recipes.map((recipe) => (
              <li key={recipe._id} className="recipe-item">
                <Link to={`/recipes/${recipe._id}`} className="recipe-link">
                  {recipe.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="right-column">
        <Outlet />
      </div>
    </div>
  );
}