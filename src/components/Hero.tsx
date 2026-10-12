import React from "react";
import { Link } from "react-router-dom";
import { displayMasterName, instagramProfileUrl, masterInfo } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Hero.module.css";

// Replace with a real portrait file in public/images when one is available.
const heroPortrait: string | undefined = undefined;

const Hero: React.FC = () => {
  return (
    <>
      <SEO
        title={`${displayMasterName} | ${masterInfo.city}`}
        description="Услуги бьюти-мастера: оформление и коррекция бровей, перманентный макияж в Костанае."
      />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.heroContent}>
          <h1 className={styles.title} id="home-title">
            Естественная красота
          </h1>
          <p className={styles.subtitle}>Оформление бровей и перманентный макияж</p>
          <p className={styles.description}>
            Аккуратная форма, внимание к деталям и индивидуальный подход к каждому клиенту.
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

        <figure className={styles.portrait}>
          {heroPortrait ? (
            <img
              src={heroPortrait}
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
