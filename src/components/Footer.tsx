import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#586552] text-[#e2d2bb] py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-xl font-serif font-semibold">
              Валерий Багаев
            </Link>
            <p className="mt-2 text-sm">Художник • Живописец • Творец</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/" className="hover:text-white transition-colors">
              Главная
            </Link>
            <Link to="/gallery" className="hover:text-white transition-colors">
              Галерея
            </Link>
            <Link to="/contact" className="hover:text-white transition-colors">
              Контакты
            </Link>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4">
            <a 
              href="https://vk.com/id14376696" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="VK"
              className="hover:text-white transition-colors"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/f/f3/VK_Compact_Logo_%282021-present%29.svg" 
                alt="VK" 
                className="h-5 w-5"
              />
            </a>
            <a 
              href="https://t.me/bagaev_art" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Telegram"
              className="hover:text-white transition-colors"
            >
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg" 
                alt="Telegram" 
                className="h-5 w-5"
              />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[#e2d2bb]/20 text-center text-sm">
          <p>© {new Date().getFullYear()} Валерий Багаев. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;