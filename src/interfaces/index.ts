import { ChangeEventHandler } from "react";

export interface ISVGProps {
  fillColor?: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface ISeachInputProps {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  props?: [any];
}

export interface ICustomDropdownProps {
  value?: string;
  options?: string[];
  onChange?: (value: string) => void;
}

export interface IProductsSliceState {
  products: [IProduct] | [] | undefined;
  filtered: [IProduct] | [] | undefined;
  status: string;
}

export interface ICartSliceState {
  products: [ICartItem] | [] | undefined;
  total: number;
}
