import { displayMasterName, masterInfo } from "./masterData.js";

const siteUrl = "https://beauty-mu-ten.vercel.app";
const socialImage = new URL(
  "/images/Теневая растушевка бровей.jpg",
  siteUrl,
).toString();

export interface SeoMetadata {
  title: string;
  description: string;
  url?: string;
  image?: string;
  imageAlt?: string;
  twitterCard?: "summary" | "summary_large_image";
}

const sharedSocialMetadata = {
  image: socialImage,
  imageAlt: "Фотография работы «Теневая растушёвка бровей»",
  twitterCard: "summary" as const,
};

const page = (path: string, title: string, description: string): SeoMetadata => ({
  ...sharedSocialMetadata,
  title,
  description,
  url: new URL(path, siteUrl).toString(),
});

export const routeSeo = {
  "/": page(
    "/",
    `${displayMasterName} | ${masterInfo.city}`,
    "Перманентный макияж от Анастасии. Деликатный подход, внимание к индивидуальным особенностям и пожеланиям.",
  ),
  "/services": page(
    "/services",
    `Услуги | ${displayMasterName} | ${masterInfo.city}`,
    "Перманентный макияж бровей и глаз, лазерное удаление татуажа. Цены указаны в тенге.",
  ),
  "/portfolio": page(
    "/portfolio",
    `Портфолио | ${displayMasterName} | ${masterInfo.city}`,
    "Фотографии услуг мастера: перманентный макияж бровей и глаз, лазерное удаление татуажа.",
  ),
  "/about": page(
    "/about",
    `О мастере | ${displayMasterName} | ${masterInfo.city}`,
    "Информация о мастере и услугах в Костанае.",
  ),
  "/contacts": page(
    "/contacts",
    `Контакты | ${displayMasterName} | ${masterInfo.city}`,
    "Чтобы записаться или уточнить подробности, напишите мне в Instagram. Обсудим ваши пожелания и выберем удобное время.",
  ),
} satisfies Record<string, SeoMetadata>;

export const notFoundSeo: SeoMetadata = {
  title: "Страница не найдена",
  description: "Запрошенная страница не найдена. Перейдите на главную страницу сайта.",
};

export type SeoRoute = keyof typeof routeSeo | "notFound";

export const getSeoMetadata = (route: SeoRoute): SeoMetadata =>
  route === "notFound" ? notFoundSeo : routeSeo[route];
