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
  price?: string; // placeholder, реальную цену указывать только при подтверждении услуги
  duration?: string; // placeholder, указать длительность при подтверждении
  isActive: boolean; // false = скрыто с публичного сайта
  image?: string; // placeholder, заменить на реальное изображение при наличии
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
  photo?: string; // placeholder, заменить на реальное фото мастера
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
  name: "Имя мастера", // Замените на реальное имя мастера
  instagramUsername: "your_username", // Замените на реальный Instagram username
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
    ? `https://www.instagram.com/${configuredInstagramUsername}/`
    : undefined;

// Услуги (активные будут отображаться на сайте)
export const services: Service[] = [
  {
    id: "brow-design",
    name: "Оформление и коррекция бровей",
    category: "Брови",
    description: "Профессиональное оформление и коррекция формы бровей по вашим предпочтениям",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "brow-tinting",
    name: "Окрашивание бровей",
    category: "Брови",
    description: "Долговременное окрашивание бровей с использованием профессиональных красителей",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "brow-lamination",
    name: "Долговременная укладка бровей",
    category: "Брови",
    description: "Ламинирование бровей для создания идеальной формы на длительный срок",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "brow-permanent",
    name: "Перманентный макияж бровей",
    category: "Перманент",
    description: "Перманентный макияж бровей с использованием современного оборудования",
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "lip-permanent",
    name: "Перманентный макияж губ",
    category: "Перманент",
    description: "Перманентный макияж губ для естественного вида",
    isActive: false, // false = скрыть до подтверждения услуги
  },
  {
    id: "eyeliner-permanent",
    name: "Межресничный перманент",
    category: "Перманент",
    description: "Межресничный перманент для выразительного взгляда",
    isActive: false, // false = скрыть до подтверждения услуги
  },
  {
    id: "permanent-touchup",
    name: "Коррекция и обновление перманентного макияжа",
    category: "Перманент",
    description: "Коррекция и обновление существующего перманентного макияжа",
    isActive: false, // false = скрыть до подтверждения услуги
  },
  {
    id: "additional-services",
    name: "Дополнительные beauty-услуги",
    category: "Другое",
    description: "Индивидуальные beauty-услуги по запросу",
    isActive: false, // false = скрыть до подтверждения услуги
  },
];

// Портфолио заполняется только подтверждёнными реальными работами.
export const portfolio: PortfolioItem[] = [];

// Информация о мастере
export const about: About = {
  name: "Имя мастера", // Замените на реальное имя мастера
  story: "",
  specialization: "",
  principles: [],
};

// Контактная информация
export const contact: Contact = {
  instagram: "your_username", // Замените на реальный Instagram username
  phone: "", // placeholder, указать при наличии
  address: "", // placeholder, указать при наличии
  workingHours: "", // placeholder, указать при наличии
};
