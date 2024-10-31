import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../../../assets/Ladle_logo.png";
import Button from "../../Elements/button/Button";
import NavbarLinks from "../navbarLinks/NavbarLinks";
import SearchBar from "../../Elements/searchbar/SearchBar";

import "./Navbar.css";

const Navbar = () => {
  const [linksState, setLinksState] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    if (!pathname.includes("/")) {
      setLinksState(true);
      return;
    }
    const firstSection = pathname.split("/")[1].trim();
    if (firstSection === "recipes") {
      setLinksState(false);
    } else {
      setLinksState(true);
    }
  }, [pathname]);

  return (
    <div className="navbar">
      <div className="navbar-header">
        <Link to="/">
          <img src={logo} alt="ladle" />
        </Link>
      </div>
      {linksState ? <NavbarLinks /> : <SearchBar />}
      <div className="navbar-search">
        <Button color="purple" size="3" id="explore">
          Favourites
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
