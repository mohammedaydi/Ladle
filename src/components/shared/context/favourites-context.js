import { createContext } from "react";

const favContext = createContext({
  favourites: [],
  addToFavourites: (item) => {},
  removeFromFavourites: (item) => {},
});

export default favContext;
