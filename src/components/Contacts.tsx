// Contacts component for Beauty Master website
import React from "react";
import { masterInfo, contact } from "../data/masterData";
import styles from "./Contacts.module.css";

/**
 * Section displaying contact information and a primary CTA to Instagram.
 * Renders city, optional contact details, and a button linking to the Instagram profile.
 * If the Instagram username is missing or set to the placeholder "your_username",
 * the button is disabled with a tooltip explaining the issue.
 */
const Contacts: React.FC = () => {
  const hasValidInstagram =
    masterInfo.instagramUsername && masterInfo.instagramUsername !== "your_username";
  const instagramUrl = hasValidInstagram
    ? `https://www.instagram.com/${masterInfo.instagramUsername}/`
    : "#";

  // Determine which optional fields are present and non‑empty
  const optionalFields: Array<{ label: string; value?: string }> = [
    { label: "Телефон", value: contact.phone },
    { label: "Адрес", value: contact.address },
    { label: "Часы работы", value: contact.workingHours },
  ].filter((item) => item.value && item.value.trim().length > 0);

  return (
    <section
      className={styles.contacts}
      role="region"
      aria-labelledby="contacts-heading"
    >
      <p className="sr-only">Контакты</p>
      <h1 id="contacts-heading" className={styles.heading}>
        Запишитесь на процедуру
      </h1>

      {masterInfo.city && (
        <p className={styles.city}>Город: {masterInfo.city}</p>
      )}

      {optionalFields.length > 0 && (
        <ul className={styles.list}>
          {optionalFields.map((item) => (
            <li key={item.label} className={styles.listItem}>
              <strong>{item.label}:</strong> {item.value}
            </li>
          ))}
        </ul>
      )}

      {hasValidInstagram ? (
        <a
          href={instagramUrl}
          className={styles.cta}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Записаться через Instagram"
        >
          Записаться
        </a>
      ) : (
        <button
          className={styles.cta}
          disabled
          aria-label="Instagram username not set"
          title="Замените username в masterData.ts"
        >
          Записаться
        </button>
      )}
    </section>
  );
};

export default Contacts;
