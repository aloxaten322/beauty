import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { displayMasterName, instagramProfileUrl } from "../data/masterData";
import styles from "./Header.module.css";

const navigationItems = [
  { to: "/services", label: "Услуги" },
  { to: "/portfolio", label: "Работы" },
  { to: "/about", label: "О мастере" },
  { to: "/contacts", label: "Контакты" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Главное меню">
        <Link to="/" className={styles.brand} onClick={closeMenu}>
          {displayMasterName}
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
