import { Artwork } from '../types';

export const allArtworks: Artwork[] = [
  {
    id: "11",
    title: "Натюрморт с бокалом вина, устрицами и лимоном",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-05-12_16-07-10.webp",
    description: "Классический натюрморт в духе голландских мастеров XVII века. Композиция передает атмосферу роскоши и изобилия через тщательно выписанные детали: переливающееся вино в бокале, жемчужный блеск устриц и сочная текстура лимона.\n\n",
    year: "2025",
    category: "Натюрморт",
    medium: "Холст, масло",
    dimensions: "38 × 46 см",
    featured: true,
    sold: false
  },
  {
    id: "10",
    title: "Гравитация",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-04-15_08-56-36.webp",
    additionalImages: [
      "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-04-15_08-56-37.webp",
      "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-04-15_08-56-36%20(2).webp",
    ],
    description: "Ужасы гравитации",
    year: "2025",
    category: "Натюрморт",
    medium: "Дерево, масло",
    dimensions: "40 × 16 см и 16 × 28 см",
    featured: true,
    sold: false
  },
 {
    id: "9",
    title: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-04-11_09-34-33.webp",
    imageUrl: "https://i.postimg.cc/T1Cn8KP2/photo-2025-04-11-09-34-33.jpg",
    description: "Мандаринки, сливы и раковины. Что еще надо для счастья",
    year: "2025",
    category: "Натюрморт",
    medium: "Холст, масло",
    dimensions: "20 × 25 см"
  },
  {
    id: "8",
    title: "Натюрморт с бокалом вина, лимоном и раковиной",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-04-05_09-21-21.webp",
    description: "Классический натюрморт с фруктами, выполненный в традициях старых мастеров. Игра света и тени подчеркивает текстуру и форму каждого элемента композиции.\n\nЭта работа представляет собой изучение традиционных техник живописи и композиции, с особым вниманием к передаче материальности предметов и созданию гармоничного цветового решения.",
    year: "2025",
    category: "Натюрморт",
    medium: "Холст, масло",
    dimensions: "20 × 25 см",
    featured: true,
    sold: true
  },
  {
    id: "7",
    title: "Лесопед",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-05-14_09-34-56.webp",
    additionalImages: [
      "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-05-14_09-34-57.webp",
      "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-03-29_10-34-12.webp",
    ],
    description: "Ехали медведи на велосипеде..",
    year: "2025",
    category: "Анимализм",
    medium: "Холст, масло",
    dimensions: "25 × 60 см",
    featured: true,
    sold: false
  },
  {
    id: "6",
    title: "Рыбный день",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-03-29_08-29-27.webp",
    description: "Хитрый-хитрый кот",
    year: "2025",
    category: "Анимализм",
    medium: "Холст, масло",
    dimensions: "41 × 33 см",
    sold: true
  },
  {
    id: "5",
    title: "Нормандия",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-02-19_20-25-32.webp",
    description: "Какой кальвадос...сейчас бы туда...",
    year: "2025",
    category: "Натюрморт",
    medium: "Холст, масло",
    dimensions: "30 × 25 см",
    featured: true
  },
  {
    id: "4",
    title: "Рыба",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2025-01-27_15-30-02.webp",
    description: "А кто проиграл то?",
    year: "2025",
    category: "Анимализм",
    medium: "Холст, масло",
    dimensions: "54 × 65 см",
    sold: true
  },
  {
    id: "3",
    title: "Пара",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2024-12-16_14-25-58.webp",
    description: "Туда бы еще пару литров",
    year: "2024",
    category: "Натюрморт",
    medium: "Холст, масло",
    dimensions: "35 × 27 см",
    sold: true
  },
  {
    id: "2",
    title: "Приятные хлопоты",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2024-12-10_15-03-20.webp",
    description: "А какие же еще хлопоты могут быть зимой?",
    year: "2024",
    category: "Пейзаж",
    medium: "Холст, масло",
    dimensions: "50 × 65 см",
    featured: true,
    sold: true
  },
  {
    id: "1",
    title: "Шляпляндия",
    imageUrl: "https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/photo_2024-06-26_09-34-27.webp",
    description: "И головной убор и дом",
    year: "2024",
    category: "Пейзаж",
    medium: "Холст, масло",
    dimensions: "60 × 73 см",
    featured: true,
    sold: true
  }
];

export const featuredArtworks = allArtworks.filter(artwork => artwork.featured);