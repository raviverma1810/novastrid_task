import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { ICartItem, ICartSliceState } from "../../interfaces";

const initialState: ICartSliceState = {
  products: undefined,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        product: ICartItem;
      }>
    ) => {
      const { product } = action.payload;
      const clone = [...(state.products ?? [])] as [ICartItem];
      const index = clone.findIndex((item) => item.id === product.id);
      if (index != -1) {
        const productToUpdate = clone[index];
        productToUpdate.quantity = (productToUpdate.quantity ?? 0) + 1;
        clone.splice(index, 1, productToUpdate);
      } else {
        clone.push({ ...product, quantity: 1 });
      }
      state.products = [...clone];
    },
    removeItem: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      const { id } = action.payload;
      const clone = [...(state.products ?? [])] as [ICartItem];
      const filtered = clone.filter((product) => product.id !== id) as [
        ICartItem
      ];
      state.products = [...filtered];
    },
    increaseQty: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      const { id } = action.payload;
      const clone = [...(state.products ?? [])] as [ICartItem];
      const index = clone.findIndex((product) => product.id === id);
      const product = clone[index];
      product.quantity = (product.quantity ?? 0) + 1;
      clone.splice(index, 1, product);
      state.products = [...clone];
    },
    decreaseQty: (
      state,
      action: PayloadAction<{
        id: number;
      }>
    ) => {
      const { products } = state;
      const { id } = action.payload;
      const clone = [...(products ?? [])] as [ICartItem];
      const index = clone.findIndex((product) => product.id === id);
      const product = clone[index];
      product.quantity = (product.quantity ?? 0) - 1;
      if (product.quantity === 0) {
        clone.splice(index, 1);
      } else {
        clone.splice(index, 1, product);
      }

      state.products = [...clone];
    },
  },
});

export const { addItem, removeItem, increaseQty, decreaseQty } =
  cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.products;
export const selectTotal = (state: RootState) =>
  state.cart.products?.reduce((total: any, product: ICartItem) => {
    total = total + product.quantity * product.price;
    return total;
  }, 0);
export const selectCartCount = (state: RootState) =>
  state.cart.products?.length;

export default cartSlice.reducer;
