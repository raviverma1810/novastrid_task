import { selectCartCount, selectTotal } from "../../../store/slices/cartSlice";
import { useAppSelector } from "../../../store/store";
import { Link } from "react-router-dom";
import { CartIcon } from "../../svgs";
import "./style.scss";

export default function CartButton() {
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectTotal);
  const displayTotal = Number(total || 0).toFixed(2);
  const displayCount = (count || 0) > 9 ? "9+" : count || 0;

  return (
    <Link
      to="/cart"
      className="cart-wrapper"
      aria-label="Cart button"
      aria-description="View cart and total items of cart"
    >
      <span className="cart-total">$ {displayTotal}</span>
      <div className="cart-icon">
        <span className="cart-count">{displayCount}</span>
        <CartIcon />
      </div>
    </Link>
  );
}
