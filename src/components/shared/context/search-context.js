import { createContext } from "react";
const searchContext = createContext({
  searchValue: "",
  setSearchValue: (val) => {},
});

export default searchContext;
