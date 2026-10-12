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

// Услуги (активные будут отображаться на сайте)
export const services: Service[] = [
  {
    id: "brow-design",
    name: "Оформление и коррекция бровей",
    category: "Брови",
    description: "Профессиональное оформление и коррекция формы бровей по вашим предпочтениям",
    price: "от 3000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "45-60 мин", // placeholder, указать реальную длительность
    isActive: true, // true = показывать на сайте, false = скрыть
    image: "/images/services/brow-design.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "brow-tinting",
    name: "Окрашивание бровей",
    category: "Брови",
    description: "Долговременное окрашивание бровей с использованием профессиональных красителей",
    price: "от 2500 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "30-45 мин", // placeholder, указать реальную длительность
    isActive: true, // true = показывать на сайте, false = скрыть
    image: "/images/services/brow-tinting.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "brow-lamination",
    name: "Долговременная укладка бровей",
    category: "Брови",
    description: "Ламинирование бровей для создания идеальной формы на длительный срок",
    price: "от 4000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "60-90 мин", // placeholder, указать реальную длительность
    isActive: true, // true = показывать на сайте, false = скрыть
    image: "/images/services/brow-lamination.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "brow-permanent",
    name: "Перманентный макияж бровей",
    category: "Перманент",
    description: "Перманентный макияж бровей с использованием современного оборудования",
    price: "от 15000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "2-3 часа", // placeholder, указать реальную длительность
    isActive: true, // true = показывать на сайте, false = скрыть
    image: "/images/services/brow-permanent.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "lip-permanent",
    name: "Перманентный макияж губ",
    category: "Перманент",
    description: "Перманентный макияж губ для естественного вида",
    price: "от 18000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "2-3 часа", // placeholder, указать реальную длительность
    isActive: false, // false = скрыть до подтверждения услуги
    image: "/images/services/lip-permanent.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "eyeliner-permanent",
    name: "Межресничный перманент",
    category: "Перманент",
    description: "Межресничный перманент для выразительного взгляда",
    price: "от 16000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "2-3 часа", // placeholder, указать реальную длительность
    isActive: false, // false = скрыть до подтверждения услуги
    image: "/images/services/eyeliner-permanent.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "permanent-touchup",
    name: "Коррекция и обновление перманентного макияжа",
    category: "Перманент",
    description: "Коррекция и обновление существующего перманентного макияжа",
    price: "от 8000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "1-2 часа", // placeholder, указать реальную длительность
    isActive: false, // false = скрыть до подтверждения услуги
    image: "/images/services/permanent-touchup.jpg", // placeholder, заменить на реальное изображение
  },
  {
    id: "additional-services",
    name: "Дополнительные beauty-услуги",
    category: "Другое",
    description: "Индивидуальные beauty-услуги по запросу",
    price: "от 2000 ₸", // placeholder, указать реальную цену при подтверждении услуги
    duration: "30-60 мин", // placeholder, указать реальную длительность
    isActive: false, // false = скрыть до подтверждения услуги
    image: "/images/services/additional.jpg", // placeholder, заменить на реальное изображение
  },
];

// Портфолио (активные будут отображаться на сайте)
export const portfolio: PortfolioItem[] = [
  {
    id: "work-1",
    title: "Коррекция бровей",
    description: "До и после коррекции бровей",
    category: "Брови",
    image: "/images/portfolio/work-1.jpg", // placeholder, заменить на реальное изображение
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "work-2",
    title: "Перманентный макияж губ",
    description: "Естественный перманентный макияж губ",
    category: "Перманент",
    image: "/images/portfolio/work-2.jpg", // placeholder, заменить на реальное изображение
    isActive: true, // true = показывать на сайте, false = скрыть
  },
  {
    id: "work-3",
    title: "Окрашивание бровей",
    description: "Результат окрашивания бровей",
    category: "Брови",
    image: "/images/portfolio/work-3.jpg", // placeholder, заменить на реальное изображение
    isActive: false, // false = скрыть до подтверждения работы
  },
  {
    id: "work-4",
    title: "Ламинирование бровей",
    description: "Результат ламинирования бровей",
    category: "Брови",
    image: "/images/portfolio/work-4.jpg", // placeholder, заменить на реальное изображение
    isActive: false, // false = скрыть до подтверждения работы
  },
];

// Информация о мастере
export const about: About = {
  name: "Имя мастера", // Замените на реальное имя мастера
  photo: "/images/master-photo.jpg", // placeholder, заменить на реальное фото мастера
  story: "Опытный мастер бьюти-услуг с многолетним стажем работы в индустрии красоты. Специализируюсь на перманентном макияже и уходе за бровями.", // placeholder, краткая история мастера
  specialization: "Перманентный макияж, оформление и коррекция бровей", // placeholder, специализация
  experience: "5+ лет", // placeholder, опыт работы
  education: "Сертифицированный мастер по перманентному макияжу", // placeholder, образование и сертификаты
  principles: [
    "Индивидуальный подход к каждому клиенту",
    "Использование только качественных материалов",
    "Соблюдение санитарных норм",
    "Комфорт и безопасность клиента",
  ], // placeholder, принципы работы
};

// Контактная информация
export const contact: Contact = {
  instagram: "your_username", // Замените на реальный Instagram username
  phone: "", // placeholder, указать при наличии
  address: "", // placeholder, указать при наличии
  workingHours: "", // placeholder, указать при наличии
};
