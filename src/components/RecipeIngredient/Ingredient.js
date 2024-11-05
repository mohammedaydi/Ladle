import "./Ingredient.css";

const Ingredient = (props) => {
  return (
    <div className="recipe-ingredients__item">
      <div className="recipe-ingredients__title">
        <h3>{props.original}</h3>
      </div>
      <div className="recipe-ingredients__amount">
        <p>{"Quantity: " + props.amount + " " + props.unit}</p>
      </div>
    </div>
  );
};

export default Ingredient;
