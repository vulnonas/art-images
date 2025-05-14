import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight, RussianRuble as Ruble } from 'lucide-react';
import { allArtworks } from '../data/artworks';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkGallery from '../components/ArtworkGallery';
import { Artwork } from '../types';

const ArtworkPage = () => {
  const { id } = useParams<{ id: string }>();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!id) return;
    
    const foundArtwork = allArtworks.find(art => art.id === id);
    
    if (foundArtwork) {
      setArtwork(foundArtwork);
      document.title = `${foundArtwork.title} | Валерий Багаев`;
      
      const related = allArtworks
        .filter(art => art.id !== id && art.category === foundArtwork.category)
        .slice(0, 6);
      
      setRelatedArtworks(related);
    }
    
    window.scrollTo(0, 0);
  }, [id]);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 400;
      sliderRef.current.scrollLeft += direction === 'left' ? -scrollAmount : scrollAmount;
    }
  };
  
  if (!artwork) {
    return (
      <div className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <p className="text-xl text-[#586552]">Работа не найдена</p>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link 
            to="/gallery" 
            className="inline-flex items-center text-[#586552] hover:text-[#898873] transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Назад к галерее
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <ArtworkGallery 
              images={artwork.additionalImages 
                ? [artwork.imageUrl, ...artwork.additionalImages]
                : [artwork.imageUrl]
              }
              title={artwork.title}
            />
          </div>
          
          <div>
            <h1 className="text-3xl md:text-4xl font-serif font-medium text-[#586552] mb-4">
              {artwork.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-[#898873]">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{artwork.year}</span>
              </div>
              
              <div className="flex items-center text-[#898873]">
                <Tag className="h-5 w-5 mr-2" />
                <span>{artwork.category}</span>
              </div>

              <div className="flex items-center text-[#898873]">
                <Ruble className="h-5 w-5 mr-2" />
                <span>{artwork.sold ? 'Продано' : 'В наличии'}</span>
              </div>
            </div>
            
            <div className="mb-8 prose prose-lg text-[#586552]/90 max-w-none">
              {artwork.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">{paragraph}</p>
              ))}
            </div>
            
            {artwork.dimensions && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-[#586552] mb-2">
                  Размеры
                </h3>
                <p className="text-[#898873]">{artwork.dimensions}</p>
              </div>
            )}
            
            {artwork.medium && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-[#586552] mb-2">
                  Техника
                </h3>
                <p className="text-[#898873]">{artwork.medium}</p>
              </div>
            )}
          </div>
        </div>
        
        {relatedArtworks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-serif font-medium text-[#586552] mb-8">
              Похожие работы
            </h2>
            
            <div className="relative">
              <div 
                ref={sliderRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
              >
                {relatedArtworks.map(relatedArtwork => (
                  <div key={relatedArtwork.id} className="min-w-[300px] max-w-[400px]">
                    <ArtworkCard artwork={relatedArtwork} />
                  </div>
                ))}
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scroll('left');
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#586552] p-2 rounded-full shadow-md transition-colors"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scroll('right');
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-[#586552] p-2 rounded-full shadow-md transition-colors"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkPage;