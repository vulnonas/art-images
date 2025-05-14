import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RussianRuble as Ruble, Images } from 'lucide-react';
import { Artwork } from '../types';

interface ArtworkCardProps {
  artwork: Artwork;
  featured?: boolean;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, featured = false }) => {
  const hasMultipleImages = artwork.additionalImages && artwork.additionalImages.length > 0;
  const totalImages = hasMultipleImages ? artwork.additionalImages.length + 1 : 1;

  return (
    <div 
      className={`group relative overflow-hidden rounded-lg shadow-md ${
        featured ? 'md:col-span-2 aspect-[16/9]' : 'aspect-square'
      }`}
    >
      <Link to={`/gallery/${artwork.id}`}>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
        
        <img 
          src={artwork.imageUrl} 
          alt={artwork.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {hasMultipleImages && (
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 z-20">
            <Images className="w-4 h-4" />
            <span className="text-sm font-medium">{totalImages}</span>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
          <h3 className="text-white text-lg md:text-xl font-medium">{artwork.title}</h3>
          
          <div className="flex items-center gap-4 mt-2">
            <span className="text-[#e2d2bb]">{artwork.category}</span>
            <div className="flex items-center text-[#e2d2bb]">
              <Ruble className="h-4 w-4 mr-1" />
              <span>{artwork.sold ? 'Продано' : 'В наличии'}</span>
            </div>
          </div>
          
          {featured && (
            <p className="text-[#e2d2bb] mt-2 line-clamp-2">{artwork.description}</p>
          )}
          
          <div className="mt-3 flex items-center text-[#e2d2bb] text-sm font-medium">
            <span>Подробнее</span>
            <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtworkCard;