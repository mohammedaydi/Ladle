import { useEffect, useState } from "react";
import Button from "../shared/Elements/button/Button";

import "./RecipeFilter.css";
import Checkbox from "../shared/Elements/checkbox/Checkbox";

const RecipeFilter = ({
  sortOption,
  filterHandler,
  sortHandler,
  priceRange,
  timeRange,
  inputIngredients,
  manageIngredientsInput,
  ingredientsList,
  filteredIngredients,
}) => {
  const [ingList, setIngList] = useState([]);
  const [checkboxList, setCheckboxList] = useState([
    { name: "Vegetarian", value: "vegetarian" },
    { name: "Vegan", value: "vegan" },
    { name: "Gluten Free", value: "glutenFree" },
    { name: "Diary free", value: "dairyFree" },
    { name: "Healty", value: "veryHealthy" },
    { name: "Popular", value: "veryPopular" },
  ]);

  useEffect(() => {
    let f = ingredientsList.filter((ing) => {
      const cond1 = ing.toLowerCase().includes(inputIngredients);
      const cond2 = filteredIngredients.filter((filteredIng) => {
        return filteredIng.ing === ing;
      });

      return cond1 && cond2.length === 0;
    });
    setIngList(f);
  }, [inputIngredients, filteredIngredients, ingredientsList]);

  const [listState, setListState] = useState(false);
  const listStateHandler = (event) => {
    if (event.type === "focus") {
      setListState(true);
    } else if (event.type === "blur") {
      setTimeout(() => {
        setListState(false);
      }, 200);
    }
  };

  return (
    <div className="recipes-filter">
      <div className="recipes-filter__search">
        <div>
          <h4>Ingredients</h4>
        </div>
        <div>
          <input
            type="text"
            placeholder="type ingredient here"
            value={inputIngredients}
            onChange={manageIngredientsInput}
            onFocus={listStateHandler}
            onBlur={listStateHandler}
          />
        </div>
        <div className="ingredients">
          {listState ? (
            <div
              className="ingredients-suggestions"
              id="ingSgst"
              onClick={manageIngredientsInput}
            >
              {ingList.map((ing) => (
                <p key={ing} id="ingSgstItem">
                  {ing}
                </p>
              ))}
            </div>
          ) : (
            <div className="ingredients-chosen" id="ingChsn">
              {filteredIngredients.map((ing) => (
                <p onClick={filterHandler} key={ing.ing} id={`ing${ing.state}`}>
                  {ing.ing}
                </p>
              ))}
            </div>
          )}
        </div>
        <div>
          <Button
            size="1"
            color="green"
            onClick={filterHandler}
            id="includeIng"
          >
            include
          </Button>
          <Button
            size="1"
            color="green"
            onClick={filterHandler}
            id="excludeIng"
          >
            exclude
          </Button>
        </div>
      </div>
      <div className="recipes-filter__sort">
        <div>
          <h4>Sort by</h4>
        </div>
        <div>
          <select onChange={sortHandler} value={sortOption}>
            <option disabled>pick a topic</option>
            <option>Name</option>
            <option>Time</option>
            <option>Price</option>
            <option>Healthiness</option>
          </select>
        </div>
      </div>
      <div className="recipes-filter__filter">
        <div>
          <h4>Filter</h4>
        </div>
        <div className="filter-range">
          <div>
            <label>Max required time</label>
            <p>{timeRange} min</p>
          </div>
          <input
            className="slider"
            type="range"
            min="20"
            step="10"
            max="500"
            id="timeRange"
            value={timeRange}
            onChange={filterHandler}
          />
        </div>
        <div className="filter-range">
          <div>
            <label>Max Price</label>
            <p>{priceRange} $</p>
          </div>
          <input
            className="slider"
            type="range"
            step="10"
            min="20"
            max="400"
            id="priceRange"
            value={priceRange}
            onChange={filterHandler}
          />
        </div>
        <div className="filter-checkboxes">
          {checkboxList.map((obj) => (
            <Checkbox
              key={obj.name}
              id={obj.name}
              label={obj.name}
              name="checks"
              value={obj.value}
              onChange={filterHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilter;
