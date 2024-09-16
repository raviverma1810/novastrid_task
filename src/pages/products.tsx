import { lazy, Suspense, useEffect } from "react";
import { useAppDispatch } from "../store/store";
import { fetchProducts } from "../store/slices/productsSlice";
const Products = lazy(() => import("../components/views/productsView"));

export default function ProductsPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <Suspense fallback={<p>Loading products...</p>}>
      <Products />
    </Suspense>
  );
}
