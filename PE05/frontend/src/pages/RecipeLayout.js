import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AddRecipe from './AddRecipe';
import RecipeList from './RecipeList';

function RecipeLayout() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [reloadToken, setReloadToken] = useState(0);

  const handleSaved = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    setReloadToken((value) => value + 1);
  };

  return (
    <>
      <div className="RecipesLayout">
        <section className="RecipesPanel">
          <RecipeList onAddClick={() => setIsAddOpen(true)} reloadToken={reloadToken} />
        </section>
        <section className="RecipesPanel">
          <Outlet />
        </section>
      </div>

      {isAddOpen ? (
        <div className="ModalOverlay" onClick={() => setIsAddOpen(false)}>
          <div className="ModalContainer" onClick={(event) => event.stopPropagation()}>
            <AddRecipe
              className="ModalCard"
              showCancel
              onCancel={() => setIsAddOpen(false)}
              onSaved={handleSaved}
            />
          </div>
        </div>
      ) : null}

         {isEditOpen ? (
        <div className="ModalOverlay" onClick={() => setIsEditOpen(false)}>
          <div className="ModalContainer" onClick={(event) => event.stopPropagation()}>
            <AddRecipe
              className="ModalCard"
              showCancel
              onCancel={() => setIsEditOpen(false)}
              onSaved={handleSaved}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}

export default RecipeLayout;