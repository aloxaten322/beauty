import React, { type ReactNode, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const revealElements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!revealElements.length) return;

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "true");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    const revealOnFocus = (event: FocusEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      const revealElement = event.target.closest("[data-reveal]");
      if (!revealElement) return;
      revealElement.setAttribute("data-revealed", "true");
      observer.unobserve(revealElement);
    };

    document.documentElement.classList.add("has-scroll-reveal");
    document.addEventListener("focusin", revealOnFocus);
    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.removeEventListener("focusin", revealOnFocus);
      document.documentElement.classList.remove("has-scroll-reveal");
    };
  }, [pathname]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
