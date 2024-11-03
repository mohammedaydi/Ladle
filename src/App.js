import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";

import Homepage from "./pages/HomePage/Homepage";
import Navbar from "./components/shared/Navigation/Navbar/Navbar";
import Recipes from "./pages/RecipesPage/Recipes";
import searchContext from "./components/shared/context/search-context";

import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setValue] = useState("");
  const setSearchValue = useCallback((val) => {
    setValue(val);
  }, []);

  const fetchRecipies = async () => {
    try {
      const response = await fetch(
        "https://api.spoonacular.com/recipes/complexSearch?apiKey=9621d08e65f74b1abbcf1c8549fbde66"
      );

      const response_data = await response.json();
      if (response.ok === true) {
        setRecipes(response_data.results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // fetchRecipies();
  }, []);
  return (
    <div className="App">
      <searchContext.Provider
        value={{ searchValue: searchValue, setSearchValue: setSearchValue }}
      >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" Component={Homepage} />
            <Route path="/recipes" element={<Recipes recipes={recipes} />} />
          </Routes>
        </Router>
      </searchContext.Provider>
    </div>
  );
}

export default App;
