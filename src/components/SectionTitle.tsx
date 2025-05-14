import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ 
  title, 
  subtitle, 
  centered = false 
}) => {
  return (
    <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-serif font-medium text-[#586552]">
        {title}
      </h2>
      
      {subtitle && (
        <p className="mt-3 text-lg text-[#898873]">
          {subtitle}
        </p>
      )}
      
      <div className={`mt-4 h-1 w-20 bg-[#586552] ${centered ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export default SectionTitle;