import React from "react";
import { services, masterInfo } from "../data/masterData";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  const activeServices = services.filter(service => service.isActive);

  const instagramUrl = masterInfo.instagramUsername && masterInfo.instagramUsername !== "your_username"
    ? `https://www.instagram.com/${masterInfo.instagramUsername}/`
    : "#";

  return (
    <section className={styles.servicesSection} aria-labelledby="services-title">
      <h2 id="services-title" className={styles.title}>
        Услуги
      </h2>

      {activeServices.length > 0 ? (
        <div className={styles.servicesList}>
          {activeServices.map((service) => (
            <article key={service.id} className={styles.serviceItem}>
              <div className={styles.serviceHeader}>
                <h3 className={styles.serviceName}>
                  {service.name}
                </h3>
                <span className={styles.servicePrice}>
                  {service.price || "Стоимость уточняйте при записи"}
                </span>
              </div>

              <p className={styles.serviceDescription}>
                {service.description}
              </p>

              {service.duration && (
                <div className={styles.serviceMeta}>
                  <span className={styles.duration}>
                    ⏱️ {service.duration}
                  </span>
                </div>
              )}

              {masterInfo.instagramUsername === "your_username" ? (
                <button className={styles.ctaButton} disabled>
                  Записаться
                </button>
              ) : (
                <a
                  href={instagramUrl}
                  className={styles.ctaButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Записаться
                </a>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p className={styles.serviceDescription}>
          В настоящее время нет доступных услуг. Пожалуйста, свяжитесь с мастером для получения дополнительной информации.
        </p>
      )}
    </section>
  );
};

export default Services;
