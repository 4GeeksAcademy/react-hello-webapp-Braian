import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container navbar-container">
        <div>
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Contact Manager</span>
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/add">
            <button className="btn btn-primary">Agregar contacto</button>
          </Link>
          <Link to="/demo">
            <button className="btn btn-outline-primary">Ver Demo</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
