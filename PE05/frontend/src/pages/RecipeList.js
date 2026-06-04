import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRecipes } from '../api/recipes';

function RecipeList({ onAddClick, reloadToken = 0 }) {
  const [recipes, setRecipes] = useState([]);
  const [status, setStatus] = useState('Loading recipes...');

  useEffect(() => {
    let isMounted = true;

    async function loadRecipes() {
      try {
        const data = await fetchRecipes();

        if (!isMounted) {
          return;
        }

        setRecipes(data);
        setStatus(data.length ? '' : 'No recipes found yet.');
      } catch (error) {
        if (isMounted) {
          setStatus(error.message);
        }
      }
    }

    loadRecipes();

    return () => {
      isMounted = false;
    };
  }, [reloadToken]);

  return (
    <>
      <div className="PanelHeader">
        <h1>Recipes</h1>
        <button className="SecondaryButton" type="button" onClick={onAddClick}>
          Add Recipe
        </button>
      </div>
      {status ? <p>{status}</p> : null}
      <ul className="RecipeCards">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="RecipeCardItem">
            <Link className="RecipeCardLink" to={`/${recipe._id}`}>
              <strong>{recipe.name || 'Untitled recipe'}</strong>
              <span>
                {Array.isArray(recipe.ingredients) && recipe.ingredients.length
                  ? recipe.ingredients.slice(0, 3).join(' · ')
                  : 'No ingredients yet'}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;