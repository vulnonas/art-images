import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Exhibition } from '../types';

interface ExhibitionCardProps {
  exhibition: Exhibition;
  onClick: () => void;
  onImageClick: (e: React.MouseEvent) => void;
}

const ExhibitionCard: React.FC<ExhibitionCardProps> = ({ exhibition, onClick, onImageClick }) => {
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
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div 
        className="relative aspect-[16/9] overflow-hidden"
        onClick={onImageClick}
      >
        <img 
          src={exhibition.imageUrl} 
          alt={exhibition.title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {exhibition.ongoing && (
          <div className="absolute top-4 right-4 bg-[#586552] text-[#e2d2bb] px-3 py-1 rounded-full text-sm">
            Актуально
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-serif font-medium text-[#586552] mb-2">
          {exhibition.title}
        </h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex items-center text-[#898873]">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{exhibition.date}</span>
          </div>
          
          <div className="flex items-center text-[#898873]">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{exhibition.location}</span>
          </div>
        </div>

        <p className="text-sm text-[#586552]/80 line-clamp-2">
          {renderDescription(exhibition.description)}
        </p>
      </div>
    </div>
  );
};

export default ExhibitionCard;