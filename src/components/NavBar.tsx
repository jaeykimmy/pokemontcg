import { Link } from "react-router-dom";

interface NavbarProps {
  // you can add any props that your Navbar component needs here
}

const Navbar: React.FC<NavbarProps> = (props) => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
    </nav>
  );
};

export default Navbar;
