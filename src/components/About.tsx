import React from "react";
import { SEO } from "./SEO";
import styles from "./About.module.css";
import { about } from "../data/masterData";

const About: React.FC = () => {
  const { photo, story, specialization, experience, education, principles } = about;
  const placeholder = "/images/about-placeholder.jpg";
  const renderIf = (content?: string) =>
    content && content.trim().length > 0 ? <p>{content}</p> : null;

  return (
    <>
      <SEO title="О мастере | Имя мастера | Костанай" description={story} />
      <section className={styles.about} role="region" aria-labelledby="about-heading">
        <h1 id="about-heading" className={styles.title}>О мастере</h1>
        <figure className={styles.photoWrapper}>
          <img src={photo || placeholder} alt="Фотография мастера" className={styles.photo} loading="lazy" />
        </figure>
        <div className={styles.content}>
          {renderIf(story)}
          {renderIf(specialization)}
          {renderIf(experience)}
          {renderIf(education)}
          {principles && principles.length > 0 && (
            <ul>
              {principles.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};

export default About;

