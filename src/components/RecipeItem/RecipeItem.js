import { useRef } from "react";
import "./RecipeItem.css";
import Button from "../shared/Elements/button/Button";
import { Link } from "react-router-dom";

const RecipeItem = (props) => {
  const itemRef = useRef(null);
  const imgRef = useRef(null);

  const mouseOverHandler = () => {
    if (itemRef.current && imgRef.current) {
      if (window.innerWidth > 800) {
        itemRef.current.style = "width: calc(60vw + 80px); outline: none;";
        imgRef.current.style = "width: 200px";
      } else if (window.innerWidth <= 800 && window.innerWidth > 450) {
        itemRef.current.style = "width: calc(80vw + 40px); outline: none;";
        imgRef.current.style = "width: 170px";
      }
    }
  };

  const mouseLeaveHandler = () => {
    if (itemRef.current && imgRef) {
      if (window.innerWidth > 800) {
        itemRef.current.style = "width: 60vw; outline: 4px var(--green) solid;";
        imgRef.current.style = "width: 170px; ";
      } else if (window.innerWidth <= 800 && window.innerWidth > 450) {
        itemRef.current.style = "width: 80vw; outline: 4px var(--green) solid;";
        imgRef.current.style = "width: 140px; ";
      }
    }
  };

  return (
    <li
      className="recipe"
      ref={itemRef}
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <div className="recipe-image">
        <img src={props.image} alt="item" ref={imgRef} />
      </div>
      <div className="recipe-title">
        <div>
          <h2>{props.title}</h2>
        </div>
        <div className="recipe-action">
          <Link to={`/recipes/${props.id}`}>
            <Button id={props.id} color="green" size="1">
              details
            </Button>
          </Link>
          {props.criterion && <p>{props.criterion}</p>}
        </div>
      </div>
    </li>
  );
};

export default RecipeItem;
