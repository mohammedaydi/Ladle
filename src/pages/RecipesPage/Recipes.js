import { useEffect, useState, useContext } from "react";
import RecipeItem from "../../components/RecipeItem/RecipeItem";
import RecipeFilter from "../../components/RecipeFilter/RecipeFilter";
import searchContext from "../../components/shared/context/search-context";
import extendedData from "../../dev/recipes";

import "./Recipes.css";

const Recipes = () => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const { searchValue } = useContext(searchContext);
  const [recipes, setRecipes] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);

  const [criterion, setCriterion] = useState("");
  const [sortOption, setSortOption] = useState("pick a topic");
  const [filteredIngredients, setFilteredIngredients] = useState([]);
  const [inputIngredients, setInputIngredients] = useState("");
  const [priceRange, setPriceRange] = useState(300);
  const [timeRange, setTimeRange] = useState(500);
  const [checkBoxItems, setCheckboxItems] = useState([]);

  const manageIngredientsInput = (event) => {
    const id = event.target.id;
    if (id === "ingSgstItem") {
      setInputIngredients(event.target.innerText);
    } else {
      setInputIngredients(event.target.value);
    }
  };

  const sortItems = (cr, tmp) => {
    if (!tmp) {
      tmp = filteredRecipes.filter(() => {
        return true;
      });
    }

    switch (cr.toLowerCase()) {
      case "name":
        tmp.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title === b.title) {
            return 0;
          } else {
            return -1;
          }
        });
        setFilteredRecipes(tmp);
        setCriterion("");
        break;
      case "time":
        tmp.sort((a, b) => {
          const cond = a.readyInMinutes > b.readyInMinutes;
          if (cond) {
            return 1;
          } else if (!cond) {
            return -1;
          } else {
            return 0;
          }
        });
        setFilteredRecipes(tmp);
        setCriterion("readyInMinutes");
        break;
      case "price":
        tmp.sort((a, b) => {
          if (a.pricePerServing > b.pricePerServing) {
            return 1;
          } else if (a.pricePerServing === b.pricePerServing) {
            return 0;
          } else {
            return -1;
          }
        });
        setFilteredRecipes(tmp);
        setCriterion("pricePerServing");
        break;
      case "healthiness":
        tmp.sort((a, b) => {
          if (a.healthScore > b.healthScore) {
            return 1;
          } else if (a.healthScore === b.healthScore) {
            return 0;
          } else {
            return -1;
          }
        });
        setFilteredRecipes(tmp);
        setCriterion("healthScore");
        break;
      default:
    }
    setFilteredRecipes(tmp);
  };

  const sortHandler = (event) => {
    const cr = event.target.value;
    setSortOption(cr);
    sortItems(cr);
  };

  const filterChecks = (event) => {
    let checkedItems = checkBoxItems;
    if (event.target.name === "checks") {
      if (event.target.checked) {
        checkedItems = [...checkBoxItems, event.target.value];
        setCheckboxItems((pre) => {
          return [...pre, event.target.value];
        });
      } else {
        checkedItems = checkBoxItems.filter((item) => {
          return item !== event.target.value;
        });
        setCheckboxItems(checkedItems);
      }
    }
    return checkedItems;
  };

  const filterIngredients = (event) => {
    const id = event.target.id;

    let filteredArr = filteredIngredients;
    if (id === "ing1" || id === "ing0") {
      filteredArr = filteredIngredients.filter((ing) => {
        return ing.ing !== event.target.innerText;
      });
      setFilteredIngredients(filteredArr);
    } else if (id === "includeIng" || id === "excludeIng") {
      if (
        filteredIngredients.filter((ing) => {
          return ing.ing === inputIngredients;
        }).length !== 0 ||
        inputIngredients === ""
      ) {
        return;
      }
      if (id === "includeIng") {
        filteredArr = [
          ...filteredIngredients,
          { ing: inputIngredients, state: 1 },
        ];
        setFilteredIngredients((prev) => {
          return [...prev, { ing: inputIngredients, state: 1 }];
        });
      } else {
        filteredArr = [
          ...filteredIngredients,
          { ing: inputIngredients, state: 0 },
        ];
        setFilteredIngredients((prev) => {
          return [...prev, { ing: inputIngredients, state: 0 }];
        });
      }
      setInputIngredients("");
    }

    return filteredArr;
  };

  const filterHandler = (event) => {
    const id = event.target.id;

    let checkedItems = filterChecks(event);
    let filteredArr = filterIngredients(event);

    let timeVal = timeRange;
    let priceVal = priceRange;
    //modify the correct value
    switch (id) {
      case "priceRange":
        priceVal = event.target.value;
        setPriceRange(event.target.value);
        break;
      case "timeRange":
        timeVal = event.target.value;
        setTimeRange(event.target.value);
        break;
      default:
    }

    filterItems(timeVal, priceVal, searchValue, filteredArr, checkedItems);
  };

  const filterItems = (
    timeVal,
    priceVal,
    searchValue,
    filteredArr,
    checkedItems
  ) => {
    let tmp = [];
    tmp = recipes.filter((recipe) => {
      return (
        recipe.pricePerServing < priceVal && recipe.readyInMinutes < timeVal
      );
    });

    if (searchValue !== "") {
      tmp = tmp.filter((recipe) => {
        return recipe.title.toLowerCase().includes(searchValue.toLowerCase());
      });
    }

    tmp = tmp.filter((recipe) => {
      let result = true;
      for (let index = 0; index < checkedItems.length; index++) {
        if (recipe[`${checkedItems[index]}`] !== true) {
          console.log("fallssse");
          result = false;
        }
      }

      return result;
    });

    if (filteredArr.length !== 0) {
      tmp = tmp.filter((recipe) => {
        let result = true;
        for (let i = 0; i < filteredArr.length; i += 1) {
          let included = false;

          recipe.extendedIngredients.forEach((ingredient) => {
            if (ingredient.nameClean === filteredArr[i].ing) {
              included = true;
            }
          });

          if (filteredArr[i].state === 1 && !included) {
            result = false;
            break;
          } else if (filteredArr[i].state === 0 && included) {
            result = false;
            break;
          }
        }

        return result;
      });
    }

    sortItems(sortOption, tmp);
  };

  useEffect(() => {
    setRecipes(extendedData);
    setFilteredRecipes(extendedData);
    let ingredients = [];
    extendedData.forEach((recipe) => {
      recipe.extendedIngredients.forEach((ing) => {
        if (!ingredients.includes(ing.nameClean)) {
          ingredients.push(ing.nameClean);
        }
      });
    });

    setIngredientsList(ingredients);
  }, []);

  useEffect(() => {
    if (recipes) {
      filterItems(
        timeRange,
        priceRange,
        searchValue,
        filteredIngredients,
        checkBoxItems
      );
    }
  }, [searchValue, recipes]);

  return (
    <div className="recipes">
      <RecipeFilter
        sortHandler={sortHandler}
        filterHandler={filterHandler}
        sortOption={sortOption}
        priceRange={priceRange}
        timeRange={timeRange}
        inputIngredients={inputIngredients}
        manageIngredientsInput={manageIngredientsInput}
        ingredientsList={ingredientsList}
        filteredIngredients={filteredIngredients}
      />
      <ul className="recipes-container">
        {filteredRecipes.map((recipe) => (
          <RecipeItem
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            id={recipe.id}
            criterion={recipe[criterion]}
          />
        ))}
      </ul>
    </div>
  );
};

export default Recipes;
