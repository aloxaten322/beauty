// Централизованный файл данных мастера бьюти-услуг
// Редактируйте этот файл для обновления контента сайта

// Типы данных
export interface MasterInfo {
  name: string;
  instagramUsername: string;
  city: string;
  currency: string;
}

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: string; // цена без символа валюты из masterInfo.currency
  isActive: boolean; // false = скрыто с публичного сайта
  image?: string; // путь к изображению услуги в public
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string; // placeholder, заменить на реальное изображение при наличии
  isActive: boolean; // false = скрыто с публичного сайта
}

export interface About {
  name: string;
  photo?: string; // путь к фотографии мастера в public
  story: string; // placeholder, краткая история мастера
  specialization: string; // placeholder, специализация
  experience?: string; // placeholder, опыт работы
  education?: string; // placeholder, образование и сертификаты
  principles: string[]; // placeholder, принципы работы
}

export interface Contact {
  instagram: string;
  phone?: string; // placeholder, указать при наличии
  address?: string; // placeholder, указать при наличии
  workingHours?: string; // placeholder, указать при наличии
}

// Данные мастера
export const masterInfo: MasterInfo = {
  name: "Анастасия",
  instagramUsername: "permanent_brows_kst", // Подтверждённый профиль для ссылок записи
  city: "Костанай, Казахстан",
  currency: "₸", // Валюта для цен
};

const configuredMasterName = masterInfo.name.trim();
const configuredInstagramUsername = masterInfo.instagramUsername.trim();

export const displayMasterName =
  configuredMasterName && configuredMasterName !== "Имя мастера"
    ? configuredMasterName
    : "Бьюти-мастер";

export const instagramProfileUrl =
  configuredInstagramUsername && configuredInstagramUsername !== "your_username"
    ? `https://instagram.com/${configuredInstagramUsername}`
    : undefined;

// Услуги (активные будут отображаться на сайте)
export const services: Service[] = [
  {
    id: "brow-shadow-shading",
    name: "Теневая растушёвка бровей",
    category: "Брови",
    description: "Перманентный макияж бровей с мягкой теневой растушёвкой.",
    price: "20 000",
    image: "/images/Теневая растушевка бровей.jpg",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "brow-machine-artistic-technique",
    name: "Аппаратно-художественная техника бровей",
    category: "Брови",
    description: "Аппаратная техника перманентного макияжа бровей.",
    price: "20 000",
    image: "/images/Аппаратно- художественная техника бровей.jpg",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "brow-combination-technique",
    name: "Комбинированная техника бровей",
    category: "Брови",
    description: "",
    price: "20 000",
    image: "/images/Комбинированная техника.jpg",
    isActive: true,
  },
  {
    id: "interlash-tattoo",
    name: "Межресничный татуаж",
    category: "Перманентный макияж глаз",
    description: "Перманентный макияж межресничного пространства.",
    price: "18 000",
    image: "/images/Межресничный татуаж.jpg",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "shaded-eyeliner",
    name: "Стрелка с растушёвкой",
    category: "Перманентный макияж глаз",
    description: "Перманентный макияж в технике стрелки с растушёвкой.",
    price: "20 000",
    image: "/images/Стрелка с растушевкой.jpg",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "laser-tattoo-removal",
    name: "Лазерное удаление татуажа",
    category: "Удаление татуажа",
    description: "Лазерная процедура удаления татуажа.",
    price: "7 000",
    image: "/images/Лазерное удаление татуажа.jpg",
    isActive: true,
  },
];

// Портфолио заполняется только подтверждёнными реальными работами.
export const portfolio: PortfolioItem[] = [
  {
    id: "portfolio-brow-shadow-shading",
    title: "Теневая растушёвка бровей",
    description: "",
    category: "Брови",
    image: "/images/Теневая растушевка бровей.jpg",
    isActive: true,
  },
  {
    id: "portfolio-brow-machine-artistic-technique",
    title: "Аппаратно-художественная техника бровей",
    description: "",
    category: "Брови",
    image: "/images/Аппаратно- художественная техника бровей.jpg",
    isActive: true,
  },
  {
    id: "portfolio-brow-combination-technique",
    title: "Комбинированная техника бровей",
    description: "",
    category: "Брови",
    image: "/images/Комбинированная техника.jpg",
    isActive: true,
  },
  {
    id: "portfolio-interlash-tattoo",
    title: "Межресничный татуаж",
    description: "",
    category: "Перманентный макияж глаз",
    image: "/images/Межресничный татуаж.jpg",
    isActive: true,
  },
  {
    id: "portfolio-shaded-eyeliner",
    title: "Стрелка с растушёвкой",
    description: "",
    category: "Перманентный макияж глаз",
    image: "/images/Стрелка с растушевкой.jpg",
    isActive: true,
  },
  {
    id: "portfolio-laser-tattoo-removal",
    title: "Лазерное удаление татуажа",
    description: "",
    category: "Удаление татуажа",
    image: "/images/Лазерное удаление татуажа.jpg",
    isActive: true,
  },
];

// Информация о мастере
export const about: About = {
  name: "Анастасия",
  photo: "/images/Портрет мастера.jpg",
  story: [
    "Меня зовут Анастасия, и уже 8 лет я помогаю женщинам раскрывать свою красоту, создавать гармоничные образы и чувствовать себя увереннее.",
    "Высокая квалификация, профессиональный подход и внимание к каждой детали позволяют мне подбирать решения с учётом индивидуальных особенностей и пожеланий каждой клиентки.",
    "Моя цель — не изменить вашу внешность, а деликатно подчеркнуть достоинства, сохранив естественность, эстетику и гармонию образа.",
  ].join("\n\n"),
  specialization: "",
  experience: "8 лет",
  principles: [],
};

// Контактная информация
export const contact: Contact = {
  instagram: instagramProfileUrl ?? "",
  phone: "", // placeholder, указать при наличии
  address: "", // placeholder, указать при наличии
  workingHours: "", // placeholder, указать при наличии
};
