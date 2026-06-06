import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddRecipePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const recipePayload = {
      name: name.trim(),
      ingredients: ingredients.split(',').map((item) => item.trim()).filter((item) => item.length > 0),
      instructions: instructions.trim()
    };

    fetch('/api/recipes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recipePayload)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Database operation failed: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setSubmitting(false);
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
        setSubmitting(false);
      });
  };

  return (
    <div className="form-container">
      <h2 className="page-title">Add New Recipe</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">Recipe Name:</label>
          <input id="name" type="text" className="form-input" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="ingredients">Ingredients (Comma Separated):</label>
          <textarea id="ingredients" className="form-textarea" rows="4" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="instructions">Instructions:</label>
          <textarea id="instructions" className="form-textarea" rows="6" value={instructions} onChange={(e) => setInstructions(e.target.value)} required />
        </div>

        <button type="submit" disabled={submitting} className={`btn ${submitting ? 'btn-disabled' : 'btn-primary'}`} style={{ width: '100%' }}>
          {submitting ? 'Transmitting payload...' : 'Commit Recipe to Database'}
        </button>
      </form>
    </div>
  );
}