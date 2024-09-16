import { ReactNode, Suspense, lazy, memo } from "react";
const HeaderComponent = lazy(() => import("../../shared/header"));
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import "./style.scss";

const MainLayout = memo(({ children }: { children?: ReactNode }) => {
  return (
    <div className="main-layout-wrapper">
      <Suspense fallback={<p>Loading...</p>}>
        <HeaderComponent />
      </Suspense>
      <Container className="outletContainer">
        {children ? children : <Outlet />}
      </Container>
    </div>
  );
});

export default MainLayout;
