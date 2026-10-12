import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div style={{ padding: "4rem 1rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>Страница не найдена</p>
      <Link to="/" style={{ color: "#863bff", textDecoration: "underline", fontSize: "1.25rem" }}>
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
