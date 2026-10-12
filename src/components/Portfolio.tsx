import React, { useState, useEffect, useCallback } from "react";
import { portfolio, type PortfolioItem } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Portfolio.module.css";

// Simple modal component
const Modal: React.FC<{
  src: string;
  alt: string;
  onClose: () => void;
}> = ({ src, alt, onClose }) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return (
    <div className={styles.modalBackdrop} role="dialog" aria-modal="true" onClick={onClose}>
      {/* stop click propagation on content */}
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={alt} className={styles.modalImg} />
        <button className={styles.closeButton} onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const activeItems = portfolio.filter((item) => item.isActive);
  const placeholder = "/images/portfolio-placeholder.jpg";
  const [selected, setSelected] = useState<PortfolioItem | null>(null);

  const openModal = (item: PortfolioItem) => setSelected(item);
  const closeModal = () => setSelected(null);

  return (
    <>
      <SEO title="Портфолио | Имя мастера | Костанай" description="Работы мастера красоты" />
      <section className={styles.portfolioSection} aria-labelledby="portfolio-title">
        <h1 id="portfolio-title" className={styles.title}>Портфолио работ</h1>
        {activeItems.length === 0 ? (
          <p>Пока нет опубликованных работ.</p>
        ) : (
          <div className={styles.grid}>
            {activeItems.map((item) => (
              <figure
                key={item.id}
                className={styles.figure}
                onClick={() => openModal(item)}
                role="button"
                tabIndex={0}
                aria-label={`Открыть ${item.title}`}
              >
                <img src={item.image ?? placeholder} alt={item.title} className={styles.img} loading="lazy" />
                <figcaption className={styles.caption}>{item.title} – {item.category}</figcaption>
              </figure>
            ))}
          </div>
        )}
        {selected && <Modal src={selected.image ?? placeholder} alt={selected.title} onClose={closeModal} />}
      </section>
    </>
  );
};

export default Portfolio;
