import React from 'react';

interface ArtistBioProps {
  photo: string;
  name: string;
  bio: string;
}

const ArtistBio: React.FC<ArtistBioProps> = ({ photo, name, bio }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
      <div className="w-full md:w-2/5 max-w-md overflow-hidden rounded-lg shadow-md">
        <img 
          src="https://i.postimg.cc/hGtvWvJ6/image.jpg" 
          alt="Валерий Багаев"
          className="w-full h-auto object-cover aspect-[3/4]"
        />
      </div>
      
      <div className="w-full md:w-3/5">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-[#586552] mb-4">
          Биография художника
        </h2>
        
        <div className="prose prose-lg text-[#586552]/90 max-w-none">
          {bio.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistBio;