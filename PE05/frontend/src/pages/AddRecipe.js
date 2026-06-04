import { useState } from 'react';
import { createRecipe } from '../api/recipes';

function AddRecipe({ className = 'PageCard', showCancel = false, onCancel, onSaved }) {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const recipe = {
        name,
        ingredients: ingredients
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean),
        instructions,
      };

      await createRecipe(recipe);
      setMessage('Recipe saved successfully.');
      setName('');
      setIngredients('');
      setInstructions('');

      if (onSaved) {
        onSaved();
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className={className}>
      <h1>Add Recipe</h1>
      <form className="SimpleForm" onSubmit={handleSubmit}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} />
        </label>

        <label>
          Ingredients
          <textarea
            value={ingredients}
            onChange={(event) => setIngredients(event.target.value)}
            placeholder="One ingredient per line"
          />
        </label>

        <label>
          Instructions
          <textarea
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
          />
        </label>

        <button type="submit" className="PrimaryLink ButtonLike">
          Save Recipe
        </button>
        {showCancel ? (
          <button type="button" className="SecondaryButton" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
      </form>
      {message ? <p>{message}</p> : null}
    </section>
  );
}

export default AddRecipe;