import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';

interface ArtworkGalleryProps {
  images: string[];
  title: string;
}

const ArtworkGallery: React.FC<ArtworkGalleryProps> = ({ images, title }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection('right');
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setDirection('left');
    setCurrentImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsDragging(true);
    setDragDistance(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - touchStartX;
    const deltaY = touchY - touchStartY;

    // Check if scrolling is more horizontal than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      e.preventDefault();
      setDragDistance(deltaX);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const threshold = window.innerWidth * 0.2; // 20% of screen width
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0) {
        handlePrevImage();
      } else {
        handleNextImage();
      }
    }

    setIsDragging(false);
    setDragDistance(0);
  };

  useKeyboardNavigation({
    onLeftPress: () => selectedImage && handlePrevImage(),
    onRightPress: () => selectedImage && handleNextImage(),
    enabled: !!selectedImage,
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4">
        {/* Main image */}
        <div 
          className="relative rounded-lg shadow-md cursor-pointer bg-white overflow-hidden"
          onClick={() => {
            setSelectedImage(images[0]);
            setCurrentImageIndex(0);
          }}
        >
          <img 
            src={images[0]} 
            alt={`${title} - основное изображение`}
            className="w-full h-auto object-contain rounded-lg transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>

        {/* Additional images in a grid */}
        {images.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {images.slice(1).map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-lg shadow-md cursor-pointer bg-white overflow-hidden"
                onClick={() => {
                  setSelectedImage(image);
                  setCurrentImageIndex(index + 1);
                }}
              >
                <img 
                  src={image} 
                  alt={`${title} - изображение ${index + 2}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-all duration-300 hover:scale-110"
          >
            <X className="h-8 w-8" />
          </button>
          
          <div className="max-w-full max-h-[90vh] relative">
            <img 
              src={images[currentImageIndex]}
              alt={title}
              className={`max-w-full max-h-[90vh] object-contain transition-all duration-300 ease-out ${
                isDragging 
                  ? 'transform translate-x-[' + dragDistance + 'px]' 
                  : direction === 'left' 
                    ? 'animate-slide-left' 
                    : direction === 'right' 
                      ? 'animate-slide-right' 
                      : ''
              }`}
              onClick={(e) => e.stopPropagation()}
              onAnimationEnd={() => setDirection(null)}
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                
                <button
                  onClick={handleNextImage}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>

                                <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 flex gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setDirection(index > currentImageIndex ? 'left' : 'right');
                        setCurrentImageIndex(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ArtworkGallery;