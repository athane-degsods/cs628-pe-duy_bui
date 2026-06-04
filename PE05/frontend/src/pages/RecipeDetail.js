import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteRecipe, fetchRecipeById } from '../api/recipes';

function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [status, setStatus] = useState('Loading recipe...');

  useEffect(() => {
    let isMounted = true;

    async function loadRecipe() {
      try {
        const data = await fetchRecipeById(id);

        if (!isMounted) {
          return;
        }

        setRecipe(data);
        setStatus(data ? '' : 'Recipe not found');
      } catch (error) {
        if (isMounted) {
          setStatus(error.message);
        }
      }
    }

    loadRecipe();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteRecipe(id);
      navigate('/recipes');
    } catch (error) {
      setStatus(error.message);
    }
  };

  if (status === 'Recipe not found') {
    return (
      <section>
        <h1>Recipe not found</h1>
        <p>The recipe you selected does not exist.</p>
        <Link className="PrimaryLink" to="/recipes">
          Back to recipes
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1>{recipe ? recipe.name : 'Recipe'}</h1>
      {status ? <p>{status}</p> : null}
      {recipe ? <h3>Recipe ID: {recipe._id}</h3> : null}
      {recipe && Array.isArray(recipe.ingredients) && recipe.ingredients.length ? (
        <div>
          <h3>Ingredients</h3>
          <ul className="BulletList">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={`${ingredient}-${index}`}>{ingredient}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {recipe && recipe.instructions ? (
        <div>
          <h3>Instructions</h3>
          <ul className="BulletList">
            {recipe.instructions
              .split(/\r?\n/)
              .map((step) => step.trim())
              .filter(Boolean)
              .map((step, index) => (
                <li key={`${step}-${index}`}>{step}</li>
              ))}
          </ul>
        </div>
      ) : null}
      {recipe ? (
        <div className="ButtonRow">
          <Link className="PrimaryLink" to={`/${recipe._id}/edit`}>
            Edit Recipe
          </Link>
          <button className="DangerButton" type="button" onClick={handleDelete}>
            Delete Recipe
          </button>
        </div>
      ) : null}
    </section>
  );
}

export default RecipeDetail;