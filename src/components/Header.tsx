import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#586552] shadow-md py-2' 
          : 'bg-[#586552]/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 text-xl md:text-2xl font-serif"
        >
          <img 
            src="https://i.postimg.cc/B6Ky2gr2/1141-Photoroom.png"
            alt="Logo"
            className="h-8 w-8 brightness-90 filter"
          />
          <span className="font-semibold text-[#e2d2bb]">
            Валерий Багаев
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => `
              ${isActive 
                ? 'text-white border-b-2 border-white' 
                : 'text-[#e2d2bb] hover:text-white'
              }
              transition-colors font-medium text-lg pb-1
            `}
          >
            Главная
          </NavLink>
          <NavLink 
            to="/gallery" 
            className={({ isActive }) => `
              ${isActive 
                ? 'text-white border-b-2 border-white' 
                : 'text-[#e2d2bb] hover:text-white'
              }
              transition-colors font-medium text-lg pb-1
            `}
          >
            Галерея
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => `
              ${isActive 
                ? 'text-white border-b-2 border-white' 
                : 'text-[#e2d2bb] hover:text-white'
              }
              transition-colors font-medium text-lg pb-1
            `}
          >
            Контакты
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-[#e2d2bb]" />
          ) : (
            <Menu className="h-6 w-6 text-[#e2d2bb]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#586552] py-4 shadow-lg md:hidden">
          <nav className="flex flex-col items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-[#e2d2bb] hover:text-white ${
                  isActive ? 'text-white font-medium' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Главная
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `text-[#e2d2bb] hover:text-white ${
                  isActive ? 'text-white font-medium' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Галерея
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-[#e2d2bb] hover:text-white ${
                  isActive ? 'text-white font-medium' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Контакты
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
