import { forwardRef, useContext, useState } from "react";
import "./Favourites.css";
import favContext from "../shared/context/favourites-context";

const Favourites = forwardRef(({ manageFavourites }, ref) => {
  const { favourites, removeFromFavourites } = useContext(favContext);
  const removeItem = (event) => {
    removeFromFavourites({ id: event.target.id });
  };
  return (
    <div className="favourites" ref={ref}>
      <div
        className="favourites-modal"
        id="favModal"
        onClick={manageFavourites}
      ></div>
      <div className="favourites-cont">
        <div>
          <h1>Favourites</h1>
        </div>
        <ul className="favourites-items">
          {favourites.map((fav) => (
            <li key={fav.id} id={fav.id} onClick={removeItem}>
              {fav.title}
            </li>
          ))}
        </ul>
        <div>
          <p>click on an item to remove it</p>
        </div>
      </div>
    </div>
  );
});

export default Favourites;
