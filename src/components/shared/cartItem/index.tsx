import { memo } from "react";
import { ICartItem } from "../../../interfaces";

const CartItem = memo(
  (props: {
    product: ICartItem;
    onIncrease: Function;
    onDecrease: Function;
    onRemove: Function;
  }) => {
    const {product, onIncrease, onDecrease, onRemove} = props;
    return (
      <div className="cart-product" data-id={product.id}>
        <img
          loading="lazy"
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <div className="product-details">
          <h3 className="product-name">{product.title}</h3>
          <p className="product-price">Price: ${product.price}</p>
          <div className="product-total">${Number(product.price * product.quantity).toFixed(2)}</div>
          <div className="quantity-controls">
            <button className="quantity-btn" onClick={() => onDecrease(product.id)}>-</button>
            <span className="quantity">{product.quantity}</span>
            <button className="quantity-btn" onClick={() => onIncrease(product.id)}>+</button>
            <button className="remove-btn" onClick={() => onRemove(product.id)}>Remove</button>
          </div>
        </div>
      </div>
    );
  }
);

export default CartItem;
