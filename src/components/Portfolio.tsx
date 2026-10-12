import React, { useCallback, useEffect, useRef, useState } from "react";
import { displayMasterName, masterInfo, portfolio, type PortfolioItem } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Portfolio.module.css";

interface ModalProps {
  item: PortfolioItem;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousActiveElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        "button:not(:disabled), a[href], [tabindex]:not([tabindex='-1'])",
      );
      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousActiveElement?.focus();
    };
  }, [onClose]);

  return (
    <div
      className={styles.modalBackdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className={styles.modalDialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="portfolio-dialog-title"
      >
        {item.image ? (
          <img src={item.image} alt={item.title} className={styles.modalImage} />
        ) : (
          <div
            className={styles.modalPlaceholder}
            role="img"
            aria-label={`Фотография работы «${item.title}» пока не добавлена`}
          >
            <span className={styles.placeholderTitle} aria-hidden="true">
              Фото работы
            </span>
            <span className={styles.placeholderHint} aria-hidden="true">
              Появится после добавления оригинального снимка
            </span>
          </div>
        )}
        <div className={styles.modalDetails}>
          <p className={styles.captionCategory}>{item.category}</p>
          <h2 id="portfolio-dialog-title" className={styles.captionTitle}>
            {item.title}
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрыть просмотр"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
};

const Portfolio: React.FC = () => {
  const activeItems = portfolio.filter((item) => item.isActive);
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <>
      <SEO
        title={`Портфолио | ${displayMasterName} | ${masterInfo.city}`}
        description="Фотографии работ появятся здесь после добавления оригинальных снимков."
      />
      <section className={styles.portfolioSection} aria-labelledby="portfolio-title">
        <header className={styles.headingGroup}>
          <h1 id="portfolio-title" className={styles.title}>
            Портфолио работ
          </h1>
          <p className={styles.intro}>
            Здесь будут фотографии работ мастера. Пока реальные снимки не добавлены.
          </p>
        </header>

        {activeItems.length > 0 ? (
          <div className={styles.grid}>
            {activeItems.map((item) => (
              <figure key={item.id} className={styles.figure}>
                <button
                  type="button"
                  className={styles.workButton}
                  onClick={() => setSelected(item)}
                  aria-label={`Открыть карточку «${item.title}»`}
                >
                  {item.image ? (
                    <img src={item.image} alt="" className={styles.image} loading="lazy" />
                  ) : (
                    <span
                      className={styles.photoPlaceholder}
                      role="img"
                      aria-label={`Фото работы «${item.title}» ещё не добавлено`}
                    >
                      <span className={styles.placeholderTitle} aria-hidden="true">
                        Фото работы
                      </span>
                      <span className={styles.placeholderHint} aria-hidden="true">
                        Будет добавлено позже
                      </span>
                    </span>
                  )}
                </button>
                <figcaption className={styles.caption}>
                  <span className={styles.captionCategory}>{item.category}</span>
                  <span className={styles.captionTitle}>{item.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>Фотографии работ появятся здесь после добавления оригинальных снимков.</p>
        )}
      </section>

      {selected && <Modal item={selected} onClose={closeModal} />}
    </>
  );
};

export default Portfolio;
