export async function fetchRecipes() {
  const response = await fetch('/api/recipes');

  if (!response.ok) {
    throw new Error('Failed to load recipes');
  }

  const recipes = await response.json();

  return recipes.map(normalizeRecipe);
}

export async function fetchRecipeById(id) {
  const response = await fetch(`/api/recipes/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to load recipe');
  }

  const recipe = await response.json();

  return normalizeRecipe(recipe);
}

export async function createRecipe(recipe) {
  const response = await fetch('/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('Failed to create recipe');
  }

  return response.json();
}

export async function updateRecipe(id, recipe) {
  const response = await fetch(`/api/recipes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    throw new Error('Failed to update recipe');
  }

  return response.json();
}

export async function deleteRecipe(id) {
  const response = await fetch(`/api/recipes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete recipe');
  }

  return response.json();
}

function normalizeRecipe(recipe) {
  return {
    ...recipe,
    ingredients: normalizeLines(recipe.ingredients),
    instructions: normalizeText(recipe.instructions),
  };
}

function normalizeLines(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .flatMap((item) => String(item).split(/\r?\n/))
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}