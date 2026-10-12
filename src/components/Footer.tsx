import React from "react";
import { masterInfo } from "../data/masterData";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const instagramUrl = masterInfo.instagramUsername && masterInfo.instagramUsername !== "your_username"
    ? `https://www.instagram.com/${masterInfo.instagramUsername}/`
    : "#";

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <span className="master-name">{masterInfo.name}</span>
        <span className="master-city">{masterInfo.city}</span>
        {instagramUrl !== "#" && (
          <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="instagram-link">
            Instagram
          </a>
        )}
      </div>
      <div className="footer-bottom">
        © {currentYear} {masterInfo.name}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
