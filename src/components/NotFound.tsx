import React from "react";
import { Link } from "react-router-dom";
import { SEO } from "./SEO";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <>
      <SEO
        route="notFound"
      />
      <section className={styles.notFound} aria-labelledby="not-found-title" data-reveal>
        <p className={styles.code} aria-hidden="true">404</p>
        <h1 id="not-found-title" className={styles.title}>Страница не найдена</h1>
        <Link to="/" className={styles.homeLink}>
          Вернуться на главную
        </Link>
      </section>
    </>
  );
};

export default NotFound;
