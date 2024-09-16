import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { IProduct, IProductsSliceState } from "../../interfaces";

const initialState: IProductsSliceState = {
  products: undefined,
  filtered: undefined,
  status: "idle",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => json);
    return response;
  }
);

function filterWithSearch(
  data: [IProduct] | undefined,
  search: string,
  filter: string
): [IProduct] | undefined {
  const searchMatcher = search.split(" ");
  console.log();
  return data?.filter(
    (product: IProduct) =>
      searchMatcher.every((term) =>
        product.title.toLocaleLowerCase().includes(term)
      ) && product.category.toLocaleLowerCase().startsWith(filter)
  ) as [IProduct];
}

function searchOnly(
  data: [IProduct] | undefined,
  search: string
): [IProduct] | undefined {
  const searchMatcher = search.split(" ");
  return data?.filter((product: IProduct) =>
    searchMatcher.every((term) =>
      product.title.toLocaleLowerCase().includes(term)
    )
  ) as [IProduct];
}

function filterOnly(
  data: [IProduct] | undefined,
  filter: string
): [IProduct] | undefined {
  return data?.filter((product: IProduct) =>
    product.category.toLocaleLowerCase().startsWith(filter)
  ) as [IProduct];
}

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    applyFilter: (
      state,
      action: PayloadAction<{
        search?: string | undefined;
        filter?: string | undefined;
      }>
    ) => {
      const { products } = state;
      const { search, filter } = action.payload;
      const clone = [...(products ?? [])] as [IProduct];
      if (search && filter) {
        state.filtered = filterWithSearch(
          clone,
          search.toLocaleLowerCase(),
          filter.toLocaleLowerCase()
        );
      } else if (search && !filter) {
        state.filtered = searchOnly(clone, search.toLocaleLowerCase());
      } else if (!search && filter) {
        state.filtered = filterOnly(clone, filter.toLocaleLowerCase());
      } else {
        state.filtered = state.products;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        let entities: [any] = [0];
        action.payload.forEach((product: IProduct, index: number) => {
          entities[index] = product;
        });
        state.products = entities;
        state.filtered = entities;
        state.status = "idle";
      });
  },
});

export const { applyFilter } = productsSlice.actions;

export const selectStatus = (state: RootState) => state.products.status;
export const selectProducts = (state: RootState) => state.products.filtered;
export const selectCategories = (state: RootState) =>
  Array.from(
    new Set([
      "All Categories",
      ...(state.products.products?.map((p) => p.category) ?? []),
    ])
  );

export default productsSlice.reducer;
