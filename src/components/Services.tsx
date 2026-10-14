import React from "react";
import { Link } from "react-router-dom";
import { contact, instagramProfileUrl, masterInfo, services } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Services.module.css";

const Services: React.FC = () => {
  const activeServices = services.filter((service) => service.isActive);
  const hasPhoneContact = Boolean(contact.phone?.trim());

  return (
    <>
      <SEO
        route="/services"
      />
      <section className={styles.servicesSection} aria-labelledby="services-title">
        <header className={styles.headingGroup} data-reveal>
          <h1 id="services-title" className={styles.title}>
            Услуги
          </h1>
          <p className={styles.intro}>Цены указаны в тенге.</p>
        </header>

        {activeServices.length > 0 ? (
          <div className={styles.servicesList}>
            {activeServices.map((service) => (
              <article
                key={service.id}
                className={`${styles.serviceItem} ${service.image ? styles.serviceItemWithImage : ""}`}
                data-reveal
              >
                {service.image && (
                  <div className={styles.serviceImageFrame}>
                    <img
                      src={service.image}
                      alt={service.name}
                      className={styles.serviceImage}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className={styles.serviceMain}>
                  <p className={styles.category}>{service.category}</p>
                  <h2 className={styles.serviceName}>{service.name}</h2>
                  {service.description.trim() && (
                    <p className={styles.serviceDescription}>{service.description}</p>
                  )}
                </div>
                <p className={styles.price}>
                  <span className={styles.metaLabel}>Стоимость</span>
                  <span className={styles.priceValue}>
                    {service.price?.trim()
                      ? `${service.price.trim()} ${masterInfo.currency}`
                      : "Будет указана позже"}
                  </span>
                </p>
              </article>
            ))}
          </div>
        ) : (
          <p className={styles.emptyState} data-reveal>Услуги будут добавлены позже.</p>
        )}

        <div className={styles.contactAction} data-reveal>
          <p>
            {instagramProfileUrl
              ? "Для записи используйте Instagram."
              : hasPhoneContact
                ? "Телефон для связи указан в разделе контактов."
                : "Способ записи пока не указан."}
          </p>
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
              Контакты
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default Services;
