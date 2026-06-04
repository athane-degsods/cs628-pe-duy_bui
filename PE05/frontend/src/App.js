import './App.css';
import { Route, Routes } from 'react-router-dom';
import EditRecipe from './pages/EditRecipe';
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import RecipeLayout from './pages/RecipeLayout';
import RecipePlaceholder from './pages/RecipePlaceholder';


function App() {
  return (
    <div className="AppShell">
      <Routes>
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/" element={<RecipeLayout />}>
          <Route index element={<RecipePlaceholder />} />
          <Route path=":id" element={<RecipeDetail />} />
        </Route>
        <Route path="/:id/edit" element={<EditRecipe />} />
      </Routes>
    </div>
  );
}

export default App;
