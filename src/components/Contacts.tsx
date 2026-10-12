import React from "react";
import { contact, displayMasterName, instagramProfileUrl, masterInfo } from "../data/masterData";
import { SEO } from "./SEO";
import styles from "./Contacts.module.css";

const Contacts: React.FC = () => {
  const phone = contact.phone?.trim();
  const phoneHref = phone?.replace(/[^\d+]/g, "");
  const address = contact.address?.trim();
  const workingHours = contact.workingHours?.trim();
  const hasContactDetails = Boolean(phone || address || workingHours);

  return (
    <>
      <SEO
        title={`Контакты | ${displayMasterName} | ${masterInfo.city}`}
        description="Контактная информация и доступный способ записи к бьюти-мастеру."
      />
      <section className={styles.contacts} aria-labelledby="contacts-heading">
        <div className={styles.introduction}>
          <h1 id="contacts-heading" className={styles.heading}>
            Контакты
          </h1>
          <p className={styles.city}>{masterInfo.city}</p>
          <p className={styles.note}>
            Подтверждённые контактные данные и способ записи появятся здесь позже.
          </p>
        </div>

        <div className={styles.contactPanel}>
          <h2 className={styles.panelTitle}>Запись</h2>
          {hasContactDetails ? (
            <dl className={styles.list}>
              {phone && (
                <div className={styles.listItem}>
                  <dt>Телефон</dt>
                  <dd>
                    {phoneHref ? <a href={`tel:${phoneHref}`}>{phone}</a> : phone}
                  </dd>
                </div>
              )}
              {address && (
                <div className={styles.listItem}>
                  <dt>Адрес</dt>
                  <dd>{address}</dd>
                </div>
              )}
              {workingHours && (
                <div className={styles.listItem}>
                  <dt>Часы работы</dt>
                  <dd>{workingHours}</dd>
                </div>
              )}
            </dl>
          ) : (
            <p className={styles.emptyNote}>Телефон, адрес и часы работы пока не указаны.</p>
          )}

          {instagramProfileUrl ? (
            <a
              href={instagramProfileUrl}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              Записаться через Instagram
            </a>
          ) : phone && phoneHref ? (
            <a href={`tel:${phoneHref}`} className={styles.cta}>
              Позвонить мастеру
            </a>
          ) : (
            <button
              type="button"
              className={styles.cta}
              disabled
              title="Ссылка для записи появится после настройки профиля или контактных данных."
            >
              Запись пока недоступна
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Contacts;
