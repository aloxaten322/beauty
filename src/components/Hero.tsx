import React from "react";
import { Link } from "react-router-dom";
import { about, displayMasterName, instagramProfileUrl, masterInfo } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  const nameForHeadline = displayMasterName === "Анастасия" ? "Анастасии" : displayMasterName;

  return (
    <>
      <SEO
        route="/"
      />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroContent} data-reveal>
          <h1 className={styles.title} id="home-title">
            <span className={styles.firstWord}>Перманентный</span>{" "}
            макияж от {nameForHeadline}
          </h1>
          <p className={styles.description}>
            Подчеркните свою естественную красоту с помощью перманентного макияжа. Деликатно подчеркну достоинства, сохранив естественность, эстетику и гармонию образа.
          </p>
          <p className={styles.location}>{masterInfo.city}</p>
          <div className={styles.ctaButtons}>
            {instagramProfileUrl ? (
              <a href={instagramProfileUrl} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
                Записаться
              </a>
            ) : (
              <button
                className={styles.ctaPrimary}
                type="button"
                disabled
                title="Ссылка для записи появится после настройки профиля Instagram."
              >
                Запись пока недоступна
              </button>
            )}
            <Link to="/portfolio" className={styles.ctaSecondary}>
              Смотреть работы
            </Link>
          </div>
        </div>

        <figure className={styles.portrait} data-reveal>
          {about.photo ? (
            <img
              src={about.photo}
              alt="Портрет бьюти-мастера"
              className={styles.image}
              loading="eager"
            />
          ) : (
            <div className={styles.photoPlaceholder} role="img" aria-label="Место для фотографии мастера">
              <span className={styles.placeholderRule} aria-hidden="true" />
              <span className={styles.placeholderTitle} aria-hidden="true">
                Фото мастера
              </span>
              <span className={styles.placeholderHint} aria-hidden="true">
                Здесь появится портрет
              </span>
            </div>
          )}
        </figure>
      </section>
    </>
  );
};

export default Hero;
