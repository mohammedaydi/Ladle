import { useState, useCallback, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import favContext from "./components/shared/context/favourites-context";
import Homepage from "./pages/HomePage/Homepage";
import Navbar from "./components/shared/Navigation/Navbar/Navbar";
import Recipes from "./pages/RecipesPage/Recipes";
import searchContext from "./components/shared/context/search-context";
import extendedData from "./dev/recipes";
import PageInterpreter from "./pages/DetailsPage/pageInterpreter/PageInterpreter";

import "./App.css";
import Favourites from "./components/favourites/Favourites";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchValue, setValue] = useState("");
  const setSearchValue = useCallback((val) => {
    setValue(val);
  }, []);

  const [favourites, setFavourites] = useState([]);

  const addToFavourites = useCallback(
    (item) => {
      if (
        favourites.filter((fav) => {
          return item.id === fav.id;
        }).length === 0
      ) {
        setFavourites((prev) => {
          return [...prev, item];
        });
        console.log(favourites);
      }
    },
    [favourites]
  );
  const removeFromFavourites = useCallback(
    (item) => {
      const tmp = favourites.filter((fav) => {
        return fav.id !== parseInt(item.id);
      });
      setFavourites(tmp);
    },
    [favourites]
  );

  const favRef = useRef();
  const manageFavourites = (event) => {
    if (event.target.id === "favModal") {
      if (favRef.current) {
        favRef.current.style = "display: none;";
      }
    } else if (event.target.id === "favButton") {
      if (favRef.current) {
        favRef.current.style = "display: flex;";
      }
    }
  };

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
        <favContext.Provider
          value={{
            favourites: favourites,
            addToFavourites: addToFavourites,
            removeFromFavourites: removeFromFavourites,
          }}
        >
          <Router>
            <Favourites manageFavourites={manageFavourites} ref={favRef} />
            <Navbar manageFavourites={manageFavourites} />
            <Routes>
              <Route path="/" Component={Homepage} />
              <Route
                path="/recipes/:id"
                element={<PageInterpreter extendedData={extendedData} />}
              />
              <Route path="/recipes" element={<Recipes recipes={recipes} />} />
            </Routes>
          </Router>
        </favContext.Provider>
      </searchContext.Provider>
    </div>
  );
}

export default App;
