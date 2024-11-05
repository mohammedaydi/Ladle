import "./RecipeCard.css";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card__image">
        <img src={recipe.image} alt="recipe" />
      </div>
      <div className="recipe-card__title">
        <h3>{recipe.title}</h3>
      </div>
    </div>
  );
};

export default RecipeCard;
