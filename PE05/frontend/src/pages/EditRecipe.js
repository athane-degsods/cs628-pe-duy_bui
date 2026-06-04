import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchRecipeById, updateRecipe } from '../api/recipes';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [message, setMessage] = useState('Loading recipe...');

  useEffect(() => {
    let isMounted = true;

    async function loadRecipe() {
      try {
        const data = await fetchRecipeById(id);

        if (!isMounted) {
          return;
        }

        if (!data) {
          setMessage('Recipe not found');
          return;
        }

        setName(data.name || '');
        setIngredients(Array.isArray(data.ingredients) ? data.ingredients.join(', ') : '');
        setInstructions(data.instructions || '');
        setMessage('');
      } catch (error) {
        if (isMounted) {
          setMessage(error.message);
        }
      }
    }

    loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await updateRecipe(id, {
        name,
        ingredients: ingredients
          .split(/\r?\n/)
          .map((item) => item.trim())
          .filter(Boolean),
        instructions,
      });

      navigate(`/${id}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <section className="PageCard">
      <h1>Edit Recipe</h1>
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
          Save Changes
        </button>
      </form>
      {message ? <p>{message}</p> : null}
      <Link className="PrimaryLink" to={`/${id}`}>
        Cancel
      </Link>
    </section>
  );
}

export default EditRecipe;