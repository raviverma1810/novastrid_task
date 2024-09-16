import "./style.scss";
import Logo from "../logo";
import { lazy, memo, Suspense, useCallback, useEffect } from "react";
import NavLinks from "../navLinks";
const CartButton = lazy(() => import("../cartButton"));

const HeaderComponent = memo(() => {
  const stickyHeader = useCallback(() => {
    const sticky = 150;
    const header = document.getElementById("header") as HTMLElement;
    window.onscroll = function () {
      if (window.pageYOffset > sticky) return header.classList.add("sticky");
      header.classList.remove("sticky");
    };
  }, []);

  useEffect(() => {
    stickyHeader();
  }, [stickyHeader]);

  return (
    <div id="header" className="header-wrapper sticky">
      <Logo />
      <div className="header-actionitems">
        <NavLinks />
        <Suspense fallback={<></>}>
          <CartButton />
        </Suspense>
      </div>
    </div>
  );
});

export default HeaderComponent;
