import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

export default function RecipeDetailsPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Target recipe resource could not be fetched.');
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleDeleteExecution = () => {
    if (window.confirm('Confirm database removal transaction?')) {
      fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) throw new Error('Database deletion transaction failed.');
          navigate('/');
          window.location.reload(); 
        })
        .catch((err) => console.error(err));
    }
  };

  if (loading) return <div>Querying backend document entry details...</div>;
  if (error) return <div className="btn-danger" style={{ padding: '10px' }}>Error: {error}</div>;
  if (!recipe) return <div>No matching document entry found.</div>;

  return (
    <div className="details-card">
      <h2 style={{ marginTop: 0, color: '#333' }}>{recipe.name}</h2>
      
      <h3 className="section-subtitle">Ingredients</h3>
      <ul style={{ lineHeight: '1.6', paddingLeft: '20px' }}>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h3 className="section-subtitle">Cooking Instructions</h3>
      <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>{recipe.instructions}</p>

      <div style={{ marginTop: '30px', paddingTop: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '15px' }}>
        <Link to={`/edit/${id}`} className="btn btn-primary">
          Edit Details
        </Link>
        <button onClick={handleDeleteExecution} className="btn btn-danger">
          Delete Recipe
        </button>
      </div>
    </div>
  );
}