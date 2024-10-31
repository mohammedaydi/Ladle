import "./NavbarLinks.css";
import { Link } from "react-router-dom";

const NavbarLinks = () => {
  return (
    <div className="navbar-links">
      <Link to="">
        <p>Home</p>
      </Link>
      <Link to="">
        <p>Recipes</p>
      </Link>
      <Link to="">
        <p>About us</p>
      </Link>
    </div>
  );
};

export default NavbarLinks;
