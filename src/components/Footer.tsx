import React from "react";
import { displayMasterName, instagramProfileUrl, masterInfo } from "../data/masterData";
import styles from "./Footer.module.css";

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.identity}>
          <span className={styles.name}>{displayMasterName}</span>
          {masterInfo.city ? (
            <span className={styles.city}>{masterInfo.city}</span>
          ) : (
            <span className={styles.city}>Местоположение будет указано позже</span>
          )}
        </div>
        {instagramProfileUrl && (
          <a
            href={instagramProfileUrl}
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        )}
      </div>
      <div className={styles.legal}>
        © {currentYear} {displayMasterName}
      </div>
    </footer>
  );
};

export default Footer;
