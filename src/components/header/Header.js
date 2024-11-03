import "./Header.css";
import Button from "../shared/Elements/button/Button";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="header">
      <div className="header-title">
        <h1>
          All
          <br /> the Recipes you dream
          <br /> of in one place <span>Ladle</span>
        </h1>
      </div>
      <div className="header-description">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quo nam
          excepturi, eaque doloremque corporis ipsam suscipit, possimus
          voluptatem voluptatum sapiente id magnam.
        </p>
      </div>
      <div className="header-actions">
        <Link to="/recipes">
          <Button id="1" size="4" color="green">
            Recipes
          </Button>
        </Link>
        <Link to="#search">
          <Button id="1" size="4" color="purple">
            Search
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
