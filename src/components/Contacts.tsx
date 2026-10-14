import React from "react";
import { contact, instagramProfileUrl, masterInfo } from "../data/masterData";
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
        route="/contacts"
      />
      <section className={styles.contacts} aria-labelledby="contacts-heading">
        <div className={styles.introduction} data-reveal>
          <h1 id="contacts-heading" className={styles.heading}>
            Контакты
          </h1>
          <p className={styles.city}>{masterInfo.city}</p>
          <p className={styles.note}>
            Буду рада ответить на ваши вопросы и помочь подобрать подходящую процедуру перманентного макияжа.
          </p>
        </div>

        <div className={styles.contactPanel} data-reveal>
          <h2 className={styles.panelTitle}>Запись на процедуру</h2>
          <p className={styles.emptyNote}>
            Чтобы записаться или уточнить подробности, напишите мне в Instagram. Обсудим ваши пожелания и выберем удобное время.
          </p>
          {hasContactDetails && (
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
          )}

          {instagramProfileUrl ? (
            <a
              href={instagramProfileUrl}
              className={styles.cta}
              target="_blank"
              rel="noopener noreferrer"
            >
              Написать в Instagram ↗
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
