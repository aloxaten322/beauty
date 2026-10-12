import React, { useState } from "react";
import { Link } from "react-router-dom";
import { masterInfo } from "../data/masterData";

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const instagramUrl = masterInfo.instagramUsername && masterInfo.instagramUsername !== "your_username"
    ? `https://www.instagram.com/${masterInfo.instagramUsername}/`
    : "#";

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Главное меню">
        <div className="nav-left">
          <Link to="/" className="site-name">
            {masterInfo.name}
          </Link>
        </div>
        <button
          className="burger"
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <span className="burger-lines" />
        </button>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`} role="menu">
          <li role="none"><Link to="/services" role="menuitem">Услуги</Link></li>
          <li role="none"><Link to="/portfolio" role="menuitem">Работы</Link></li>
          <li role="none"><Link to="/about" role="menuitem">О мастере</Link></li>
          <li role="none"><Link to="/contacts" role="menuitem">Контакты</Link></li>
          <li role="none">
            {instagramUrl === "#" ? (
              <button className="cta" disabled title="Замените username в masterData.ts">
                Записаться
              </button>
            ) : (
              <a href={instagramUrl} className="cta" target="_blank" rel="noopener noreferrer">
                Записаться
              </a>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
