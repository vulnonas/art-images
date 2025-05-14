import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/SectionTitle';
import ArtworkGrid from '../components/ArtworkGrid';
import { allArtworks } from '../data/artworks';

const GalleryPage = () => {
  useEffect(() => {
    document.title = 'Галерея | Валерий Багаев';
    window.scrollTo(0, 0);
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  
  const filteredArtworks = allArtworks.filter(artwork => {
    const matchesSearch = searchTerm === '' || 
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = yearFilter === '' || artwork.year === yearFilter;
    
    const matchesAvailability = availabilityFilter === 'all' || 
      (availabilityFilter === 'available' && !artwork.sold) ||
      (availabilityFilter === 'sold' && artwork.sold);

    return matchesSearch && matchesYear && matchesAvailability;
  });

  // Get unique years from artworks
  const years = [...new Set(allArtworks.map(artwork => artwork.year))].sort().reverse();

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Галерея работ"
          subtitle="Исследуйте мои художественные произведения"
          centered
        />
        
        <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-center">
          <input
            type="text"
            placeholder="Поиск работ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-3 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552] bg-white"
          />
          
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-3 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552] bg-white appearance-none cursor-pointer"
          >
            <option value="">Все годы</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="w-full md:w-48 px-4 py-3 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552] bg-white appearance-none cursor-pointer"
          >
            <option value="all">Все работы</option>
            <option value="available">В наличии</option>           
          </select>
        </div>
        
        {filteredArtworks.length > 0 ? (
          <ArtworkGrid artworks={filteredArtworks} />
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-[#586552]">Работы не найдены. Попробуйте изменить параметры поиска.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryPage;