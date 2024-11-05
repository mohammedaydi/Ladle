import { useParams } from "react-router-dom";
import RecipePage from "../RecipePage";
import { useEffect, useState } from "react";

const PageInterpreter = ({ extendedData }) => {
  const [recipe, setRecipe] = useState();
  const id = useParams().id;

  useEffect(() => {
    for (let index = 0; index < extendedData.length; index++) {
      const element = extendedData[index];
      if (element.id.toString() === id) {
        setRecipe(element);
        break;
      }
    }
  }, [extendedData, id]);
  return <>{recipe && <RecipePage recipe={recipe} />}</>;
};

export default PageInterpreter;
