import React from "react";
import { Link } from "react-router-dom";
import { displayMasterName, instagramProfileUrl, masterInfo, services } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  const activeServices = services.filter((service) => service.isActive);

  return (
    <>
      <SEO
        title={`Услуги | ${displayMasterName} | ${masterInfo.city}`}
        description="Услуги по оформлению бровей и перманентному макияжу. Стоимость и длительность уточняются."
      />
      <section className={styles.servicesSection} aria-labelledby="services-title">
        <header className={styles.headingGroup}>
          <h1 id="services-title" className={styles.title}>
            Услуги
          </h1>
          <p className={styles.intro}>Стоимость и длительность будут указаны после подтверждения.</p>
        </header>

        {activeServices.length > 0 ? (
          <div className={styles.servicesList}>
            {activeServices.map((service) => (
              <article key={service.id} className={styles.serviceItem}>
                <div className={styles.serviceMain}>
                  <p className={styles.category}>{service.category}</p>
                  <h2 className={styles.serviceName}>{service.name}</h2>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <p className={styles.duration}>
                    <span className={styles.metaLabel}>Длительность</span>
                    <span>{service.duration?.trim() || "Будет указана позже"}</span>
                  </p>
                </div>
                <p className={styles.price}>
                  <span className={styles.metaLabel}>Стоимость</span>
                  <span className={styles.priceValue}>{service.price?.trim() || "Будет указана позже"}</span>
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>Услуги будут добавлены позже.</p>
        )}

        <div className={styles.contactAction}>
          <p>Подробности записи — в разделе контактов.</p>
          {instagramProfileUrl ? (
            <a
              href={instagramProfileUrl}
              className={styles.ctaButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Записаться
            </a>
          ) : (
            <Link to="/contacts" className={styles.ctaButton}>
              Контакты и запись
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
