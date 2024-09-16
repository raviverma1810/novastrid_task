import {
  decreaseQty,
  increaseQty,
  removeItem,
  selectCartCount,
  selectCartItems,
  selectTotal,
} from "../../../store/slices/cartSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import CommonButton from "../../shared/button";
import CartItem from "../../shared/cartItem";
import "./style.scss";

export default function CartView() {
  const products = useAppSelector(selectCartItems);
  const count = useAppSelector(selectCartCount);
  const total = useAppSelector(selectTotal);
  const dispatch = useAppDispatch();
  const platformFee = Boolean(count) ? 1 : 0;

  const handleIncrease = (id: number) => {
    dispatch(increaseQty({ id }));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseQty({ id }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeItem({ id }));
  };

  const renderCartItems = products?.map((product) => {
    return (
      <CartItem
        key={product.id}
        product={product}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onRemove={handleRemove}
      />
    );
  });

  return (
    <div className="cartview-wrapper">
      <h2>Your Cart ({count || 0})</h2>
      <hr />
      <div className="cart-container">
        <div className="cart-products">{renderCartItems}</div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div className="summary-details">
            <p> Subtotal: <span className="subtotal">${Number(total || 0).toFixed(2)}</span> </p>
            <p> Platform Fee: <span className="tax">${platformFee}</span></p>
            <p> Total: <span className="total">${Number(total + platformFee || 0).toFixed(2)}</span></p>
          </div>
          <CommonButton text="Checkout" props={{ disabled: !Boolean(count) }} />
        </div>
      </div>
    </div>
  );
}
