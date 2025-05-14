import React from 'react';
import ArtworkCard from './ArtworkCard';
import { Artwork } from '../types';

interface ArtworkGridProps {
  artworks: Artwork[];
  featuredIndex?: number;
}

const ArtworkGrid: React.FC<ArtworkGridProps> = ({ 
  artworks, 
  featuredIndex 
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {artworks.map((artwork, index) => (
        <ArtworkCard 
          key={artwork.id} 
          artwork={artwork} 
          featured={index === featuredIndex}
        />
      ))}
    </div>
  );
};

export default ArtworkGrid;