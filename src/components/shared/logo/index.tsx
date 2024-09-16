import { Link } from "react-router-dom";
import "./style.scss";

export default function Logo() {
  return (
    <Link to="/" aria-label="Application Logo" lang="en" className="logo">
      NovaStrid <span>e-Mart</span>
    </Link>
  );
}
