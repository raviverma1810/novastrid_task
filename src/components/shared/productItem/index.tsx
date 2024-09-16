// import React from "react";
import { IProduct } from "../../../interfaces";
import CommonButton from "../button";
import "./style.scss";

export default function ProductListItem({
  product,
  onAdd,
  index,
}: {
  product: IProduct;
  onAdd: Function;
  index: number;
}) {
  return (
    <div className="product-item">
      <img
        loading={index > 4 ? "lazy" : "eager"}
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <div className="product-details">
        <h3 className="product-name">{product.title}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-price">$ {product.price}</div>
        <CommonButton text="Add to Cart" onClick={() => onAdd(product)} />
      </div>
    </div>
  );
}
