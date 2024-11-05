import { useEffect, useState, useContext } from "react";
import Button from "../../components/shared/Elements/button/Button";
import Ingredient from "../../components/RecipeIngredient/Ingredient";
import RecipeCard from "../../components/shared/RecipeCard/RecipeCard";
import { useFetch } from "../../components/shared/hooks/useFetch";
import extendedData from "../../dev/recipes";

import "./RecipePage.css";
import RecipeStep from "../../components/RecipeStep/RecipeStep";
import favContext from "../../components/shared/context/favourites-context";

const RecipePage = ({ recipe }) => {
  const [similars, setSimilars] = useState([]);
  const { addToFavourites } = useContext(favContext);

  const favHandler = (event) => {
    addToFavourites({ title: recipe.title, id: recipe.id });
  };

  const { data, loading } = useFetch(
    "GET",
    `https://api.spoonacular.com/recipes/${recipe.id}/similar?apiKey=9621d08e65f74b1abbcf1c8549fbde66`
  );

  const fetchSimilars = async (ids) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/informationBulk?ids=${ids}&apiKey=apiKey=9621d08e65f74b1abbcf1c8549fbde66`
      );

      const response_data = await response.json();

      if (response.ok === true) {
        setSimilars(response_data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let params = "";
    if (!loading) {
      if (data) {
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          params += element.id;
          if (index === data.length - 1) {
            break;
          }
          params += ",";
        }
        fetchSimilars(params);
      }
      setSimilars(extendedData); //dummy to be removed later
    }
  }, [data, loading]);
  return (
    <>
      {recipe && (
        <div className="recipe-page">
          <div className="recipe-data">
            <div className="recipe-details">
              <div className="recipe-details__image">
                <img src={recipe.image} alt="recipe" />
              </div>
              <div>
                <div className="recipe-details__title">
                  <h2>{recipe.title}</h2>
                </div>
                <div className="recipe-details__actions">
                  <Button color="green" size="3" id="fav" onClick={favHandler}>
                    Add to Favourites
                  </Button>
                </div>
              </div>
            </div>
            <div className="recipe-ingredients">
              <div>
                <h2>Ingredients</h2>
              </div>
              {recipe.extendedIngredients.map((Ing) => (
                <Ingredient
                  key={Ing.id}
                  original={Ing.original}
                  amount={Ing.amount}
                  unit={Ing.unit}
                />
              ))}
            </div>
            <div className="recipe-similars">
              {similars.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
          <div className="recipe-instructions">
            <div className="recipe-instructions__header">
              <h2>Steps</h2>
            </div>
            <ul>
              {recipe.analyzedInstructions[0].steps.map((step) => (
                <RecipeStep key={step.number} content={step.step} />
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipePage;
