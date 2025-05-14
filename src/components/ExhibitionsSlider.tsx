import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Exhibition } from '../types';
import ExhibitionCard from './ExhibitionCard';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface ExhibitionsSliderProps {
  exhibitions: Exhibition[];
}

const ExhibitionsSlider: React.FC<ExhibitionsSliderProps> = ({ exhibitions }) => {
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isTouching, setIsTouching] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = window.innerWidth >= 768 ? 400 : 300;
      const gap = 24; // 6rem converted to pixels
      const scrollAmount = cardWidth + gap;
      const newScrollLeft = sliderRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      
      // Применяем привязку к карточкам только при использовании кнопок навигации
      const cardIndex = Math.round(newScrollLeft / (cardWidth + gap));
      const targetScrollPosition = cardIndex * (cardWidth + gap);
      
      sliderRef.current.scrollTo({
        left: targetScrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX);
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Убираем привязку после перетаскивания мышью
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      // Убираем привязку после перетаскивания мышью
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsTouching(true);
    setTouchStartX(e.touches[0].clientX);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching || !sliderRef.current) return;
    const touchCurrentX = e.touches[0].clientX;
    const diff = touchStartX - touchCurrentX;
    
    // Применяем скролл без сопротивления для более естественного свайпа
    sliderRef.current.scrollLeft = scrollLeft + diff;
  };

  const handleTouchEnd = () => {
    setIsTouching(false);
    // Убираем привязку после свайпа
  };

  useKeyboardNavigation({
    onLeftPress: () => scroll('left'),
    onRightPress: () => scroll('right'),
  });

  // Function to check if text contains a URL and convert it to a clickable link
  const renderDescription = (text: string) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    if (!urlRegex.test(text)) return text;

    const parts = text.split(urlRegex);
    const matches = text.match(urlRegex) || [];
    let currentIndex = 0;

    return parts.map((part, index) => {
      if (index === 0) return part;

      const url = matches[currentIndex];
      currentIndex++;

      let linkText = "Ссылка";

      if (url.includes("artmir.yarmarka.ru")) {
        linkText = "Итоги";
      } else if (url.includes("on33.ru")) {
        linkText = "Статья";
      } else if (url.includes("https://vk.com/video-214597964_456239058?t=")) {
        linkText = "Эфир";
      }
      
      return (
        <>
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#586552] hover:text-[#898873] inline-flex items-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {linkText} <ExternalLink className="h-4 w-4" />
          </a>
          {part}
        </>
      );
    });
  };

  return (
    <>
      <div className="relative">
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ 
            scrollBehavior: (isDragging || isTouching) ? 'auto' : 'smooth',
            cursor: isDragging ? 'grabbing' : 'grab'
          }}
        >
          {exhibitions.map((exhibition) => (
            <div 
              key={exhibition.id}
              className="min-w-[300px] md:min-w-[400px] snap-start transition-transform duration-300 ease-out"
              style={{ 
                transform: isDragging ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              <ExhibitionCard
                exhibition={exhibition}
                onClick={() => setSelectedExhibition(exhibition)}
                onImageClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(exhibition.imageUrl);
                }}
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white/80 hover:bg-white text-[#586552] p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white/80 hover:bg-white text-[#586552] p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Exhibition Details Modal */}
      {selectedExhibition && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedExhibition(null)}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="relative h-64 cursor-pointer"
              onClick={() => setSelectedImage(selectedExhibition.imageUrl)}
            >
              <img 
                src={selectedExhibition.imageUrl} 
                alt={selectedExhibition.title} 
                className="w-full h-full object-cover rounded-t-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedExhibition(null);
                }}
                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-2xl font-serif font-medium text-[#586552] mb-4">
                {selectedExhibition.title}
              </h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-[#898873]">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{selectedExhibition.date}</span>
                </div>
                
                <div className="flex items-center text-[#898873]">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{selectedExhibition.location}</span>
                </div>
              </div>
              
              <p className="text-[#586552]/90 whitespace-pre-line">
                {renderDescription(selectedExhibition.description)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Close image"
          >
            <X className="h-8 w-8" />
          </button>
          
          <img 
            src={selectedImage}
            alt="Exhibition"
            className="max-w-full max-h-[90vh] object-contain transform transition-all duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default ExhibitionsSlider;