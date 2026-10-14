import React from "react";
import { Link } from "react-router-dom";
import { about, masterInfo } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./About.module.css";

const About: React.FC = () => {
  const storyParagraphs = about.story.split(/\n\s*\n/).filter((paragraph) => paragraph.trim());
  const hasConfirmedProfile = Boolean(
    storyParagraphs.length ||
      about.specialization.trim() ||
      about.education?.trim() ||
      about.principles.length,
  );

  return (
    <>
      <SEO
        route="/about"
      />
      <section className={styles.about} aria-labelledby="about-heading">
        <h1 id="about-heading" className={styles.title} data-reveal>
          О мастере
        </h1>
        <div className={styles.layout}>
          <div className={styles.content} data-reveal>
            {hasConfirmedProfile ? (
              <>
                {storyParagraphs.map((paragraph, index) => (
                  <p key={index} className={styles.story}>
                    {paragraph.trim()}
                  </p>
                ))}
                {about.specialization.trim() && (
                  <div className={styles.detail}>
                    <h2 className={styles.detailTitle}>Специализация</h2>
                    <p>{about.specialization}</p>
                  </div>
                )}
                {about.education?.trim() && (
                  <div className={styles.detail}>
                    <h2 className={styles.detailTitle}>Образование</h2>
                    <p>{about.education}</p>
                  </div>
                )}
                {about.principles.length > 0 && (
                  <div className={styles.detail}>
                    <h2 className={styles.detailTitle}>Принципы работы</h2>
                    <ul className={styles.principles}>
                      {about.principles.map((principle) => (
                        <li key={principle}>{principle}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <>
                <p className={styles.profileNote}>Подтверждённая информация о мастере появится здесь позже.</p>
                <p className={styles.city}>{masterInfo.city}</p>
                <Link to="/services" className={styles.servicesLink}>
                  Посмотреть услуги
                </Link>
              </>
            )}
          </div>

          <figure className={styles.photoWrapper} data-reveal>
            {about.photo ? (
              <img
                src={about.photo}
                alt="Портрет бьюти-мастера"
                className={styles.photo}
                loading="lazy"
              />
            ) : (
              <div className={styles.photoPlaceholder} role="img" aria-label="Портрет мастера пока не добавлен">
                <span className={styles.placeholderTitle} aria-hidden="true">
                  Портрет мастера
                </span>
                <span className={styles.placeholderHint} aria-hidden="true">
                  Фотография появится позже
                </span>
              </div>
            )}
          </figure>
        </div>
      </section>
    </>
  );
};

export default About;
