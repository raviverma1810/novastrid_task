import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import CartPage from "../../pages/cart";
const ProductsPage = lazy(() => import("../../pages/products"));
const MainLayout = lazy(() => import("../../components/layouts/main"));
const NotFoundView = lazy(() => import("../../components/views/notFound"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<p>Pelase wait...</p>}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <NotFoundView />,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
    ],
  },
]);
