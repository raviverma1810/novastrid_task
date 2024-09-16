import { ChangeEventHandler, memo, useEffect, useState } from "react";
import ProductListItem from "../../shared/productItem";
import "./style.scss";
import { ICartItem, IProduct } from "../../../interfaces";
import SearchInput from "../../shared/searchInput";
import CustomDropdown from "../../shared/customDropdown";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  applyFilter,
  selectCategories,
  selectProducts,
  selectStatus,
} from "../../../store/slices/productsSlice";
import { addItem } from "../../../store/slices/cartSlice";

const Products = memo(() => {
  const [searchText, setSearchText] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectStatus);
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value } = event.target;
    setSearchText(value);
    dispatch(applyFilter({ search: value, filter: filter }));
  };

  const handleFilter = (filter: string) => {
    const applicableFilter = filter === "All Categories" ? undefined : filter;
    setFilter(applicableFilter);
    dispatch(applyFilter({ search: searchText, filter: applicableFilter }));
  };

  const handleAddToCart = (product: IProduct) => {
    const item: ICartItem = { ...product, quantity: 1 };
    dispatch(addItem({ product: item }));
  };

  const statusMessage = (
    <p>
      {status === "loading"
        ? "Please Wait, Fetching latest products..."
        : "No Products!"}
    </p>
  );

  const renderProducts =
    products && products?.length
      ? products?.map((product: IProduct, index: number) => (
          <ProductListItem
            key={product.id}
            product={product}
            onAdd={handleAddToCart}
            index={index}
          />
        ))
      : statusMessage;

  return (
    <div className="products-wrapper">
      <div className="products-actionbar">
        <SearchInput
          placeholder="search"
          value={searchText}
          onChange={handleSearch}
        />
        <CustomDropdown options={categories} onChange={handleFilter} />
      </div>
      <hr />
      <h3 className="px-3 text-capitalize">
        {filter ?? "All Categories"} ({products?.length || 0})
      </h3>
      <div className="products-grid">{renderProducts}</div>
    </div>
  );
});

export default Products;
