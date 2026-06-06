import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditRecipePage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to retrieve existing recipe record.');
        return res.json();
      })
      .then((data) => {
        setName(data.name);
        setIngredients(data.ingredients.join(', ')); 
        setInstructions(data.instructions);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const updatedPayload = {
      name: name.trim(),
      ingredients: ingredients
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item.length > 0),
      instructions: instructions.trim()
    };

    fetch(`/api/recipes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPayload)
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Database modification transaction failed: ${res.status}`);
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

  if (loading) return <div>Querying backend document entry variables...</div>;

  return (
    <div className="form-container">
      <h2 className="page-title">Modify Recipe Information</h2>
      
      {error && (
        <div className="btn-danger" style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="editName">Recipe Name:</label>
          <input
            id="editName"
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Recipe Name"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="editIngredients">Ingredients (Comma Separated):</label>
          <textarea
            id="editIngredients"
            className="form-textarea"
            rows="4"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            placeholder="Ingredients separated by commas"
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="editInstructions">Instructions:</label>
          <textarea
            id="editInstructions"
            className="form-textarea"
            rows="6"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
            placeholder="Cooking steps"
          />
        </div>

        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            type="submit"
            disabled={submitting}
            className={`btn ${submitting ? 'btn-disabled' : 'btn-primary'}`}
            style={{ flex: 1 }}
          >
            {submitting ? 'Processing record update...' : 'Save Record Modifications'}
          </button>
          
          <button
            type="button"
            className="btn"
            style={{ backgroundColor: '#666', color: 'white' }}
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}