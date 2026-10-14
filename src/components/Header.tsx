import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { instagramProfileUrl } from "../data/masterData";
import styles from "./Header.module.css";

const navigationItems = [
  { to: "/services", label: "Услуги" },
  { to: "/portfolio", label: "Работы" },
  { to: "/about", label: "О мастере" },
  { to: "/contacts", label: "Контакты" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const brandIconRef = useRef<HTMLImageElement>(null);
  const brandAnimationRef = useRef<Animation | null>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const stopAnimationForReducedMotion = (event: MediaQueryListEvent) => {
      if (!event.matches) return;

      brandAnimationRef.current?.cancel();
      brandAnimationRef.current = null;
    };

    reducedMotionQuery.addEventListener("change", stopAnimationForReducedMotion);

    return () => {
      reducedMotionQuery.removeEventListener(
        "change",
        stopAnimationForReducedMotion,
      );
      brandAnimationRef.current?.cancel();
    };
  }, []);

  const animateBrand = () => {
    closeMenu();
    brandAnimationRef.current?.cancel();
    brandAnimationRef.current = null;

    const brandIcon = brandIconRef.current;
    if (
      !brandIcon ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const animation = brandIcon.animate(
      [
        { transform: "scale(1) rotate(0deg)", offset: 0 },
        { transform: "scale(1.12) rotate(0deg)", offset: 0.3 },
        { transform: "scale(1.12) rotate(-3deg)", offset: 0.56 },
        { transform: "scale(1.05) rotate(1deg)", offset: 0.78 },
        { transform: "scale(1) rotate(0deg)", offset: 1 },
      ],
      {
        duration: 520,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
        fill: "none",
      },
    );

    brandAnimationRef.current = animation;
    const clearAnimation = () => {
      if (brandAnimationRef.current === animation) {
        brandAnimationRef.current = null;
      }
    };

    animation.onfinish = clearAnimation;
    animation.oncancel = clearAnimation;
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Главное меню">
        <Link
          to="/"
          className={styles.brand}
          aria-label="Beauty — главная"
          onClick={animateBrand}
        >
          <img
            src="/favicon.svg"
            alt=""
            aria-hidden="true"
            className={styles.brandIcon}
            ref={brandIconRef}
          />
        </Link>

        <button
          type="button"
          className={styles.burger}
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.burgerIcon} aria-hidden="true" />
        </button>

        <ul
          id="primary-navigation"
          className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}
        >
          {navigationItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ""}`
                }
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            {instagramProfileUrl ? (
              <a
                href={instagramProfileUrl}
                className={styles.booking}
                target="_blank"
                rel="noopener noreferrer"
              >
                Записаться
              </a>
            ) : (
              <button
                type="button"
                className={styles.booking}
                disabled
                title="Ссылка для записи появится после настройки профиля Instagram."
              >
                Запись пока недоступна
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
