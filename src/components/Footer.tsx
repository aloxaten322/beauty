import React from "react";
import { displayMasterName, instagramProfileUrl, masterInfo } from "../data/masterData";
import styles from "./Footer.module.css";

declare const __BUILD_YEAR__: number;

const currentYear = __BUILD_YEAR__;

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner} data-reveal>
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
      <div className={styles.legal} data-reveal>
        © {currentYear} {displayMasterName}
      </div>
    </footer>
  );
};

export default Footer;
