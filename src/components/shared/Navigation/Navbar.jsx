import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/Ladle_logo.png";
import Button from "../Elements/Button";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-header">
        <img src={logo} alt="ladle" />
      </div>
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
      <div className="navbar-search">
        <Button color="purple" size="3" id="explore">
          Favourites
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
