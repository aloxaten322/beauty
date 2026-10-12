import React from "react";
import { Link } from "react-router-dom";
import { masterInfo } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Hero.module.css";

const Hero: React.FC = () => {
  const instagramUrl =
    masterInfo.instagramUsername && masterInfo.instagramUsername !== "your_username"
      ? `https://www.instagram.com/${masterInfo.instagramUsername}/`
      : "#";

  return (
    <>
      <SEO
        title={`${masterInfo.name} | Бьюти-мастер в Костанае`}
        description="Услуги бьюти-мастера: оформление и коррекция бровей, перманентный макияж в Костанае."
      />
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>{masterInfo.name}</h1>
          <p className={styles.subtitle}>Бьюти-мастер в {masterInfo.city}</p>
          <p className={styles.description}>
            Профессиональные услуги красоты: оформление бровей, перманентный макияж, коррекция.
            Индивидуальный подход к каждому клиенту.
          </p>
          <div className={styles.ctaButtons}>
            {instagramUrl === "#" ? (
              <button className={styles.ctaPrimary} disabled title="Замените username в masterData.ts">
                Записаться
              </button>
            ) : (
              <a href={instagramUrl} className={styles.ctaPrimary} target="_blank" rel="noopener noreferrer">
                Записаться
              </a>
            )}
            <Link to="/portfolio" className={styles.ctaSecondary}>
              Смотреть работы
            </Link>
          </div>
        </div>
        <div className={styles.heroImage}>
          <img
            src="/images/hero.jpg"
            alt="Профессиональные услуги красоты в Костанае"
            className={styles.image}
            loading="eager"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
