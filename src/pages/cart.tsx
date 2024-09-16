import { lazy, Suspense } from "react";
const CartView = lazy(() => import("../components/views/cartView"));

export default function CartPage() {
  return (
    <Suspense fallback={<p>Loading cart...</p>}>
      <CartView />
    </Suspense>
  );
}
