import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ArtistBio from '../components/ArtistBio';
import SectionTitle from '../components/SectionTitle';
import ArtworkGrid from '../components/ArtworkGrid';
import ExhibitionsSlider from '../components/ExhibitionsSlider';
import { featuredArtworks } from '../data/artworks';
import { exhibitions } from '../data/exhibitions';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const HomePage = () => {
  useEffect(() => {
    document.title = 'Валерий Багаев | Художник';
  }, []);

  const bioSection = useIntersectionObserver({ threshold: 0.2 });
  const exhibitionsSection = useIntersectionObserver({ threshold: 0.2 });
  const worksSection = useIntersectionObserver({ threshold: 0.2 });

  const artistBio = `Художник Валерий Багаев – творец и мастер неординарной живописи в духе фантастического реализма. Основой для его произведений может служить как холст, так и дерево, и разнообразные предметы досуга и быта. Сюжеты картин всегда приходят из жизни, но сказочное воображение автора развивает и продолжает одну сюжетную линию за другой, создавая необыкновенные города и камерные жанровые сценки.

  Автор определяет свой стиль как «голландский сюрреализм», периодически уходящий в русско-сибирские дали. Влияние голландской школы живописи на Валерия очевидно, но образность и мифологичность сюжета характерны, скорее всего, для символизма. Именно это необычное сочетание композиции, техники и манеры письма выделяют художника среди российских авторов.

  Родился Валерий Багаев в Петропавловске — Камчатском, в данный момент живет и работает в Нижнем Новгороде. К живописи пришел не сразу, но можно уверенно сказать, что в ней он нашел себя и без остатка посвятил себя творчеству. Художник много путешествовал по России, врожденная наблюдательность принесла Валерию достаточно материала для творческой работы: своеобразные сюжетные линии картин, их легенды и персонажи – зачастую являются аллегориями на реальную жизнь. 

  Многогранный, глубокий и волшебный живописный мир Валерия Багаева — это увлечение, которое не надоедает, это вечные ценности и сильные эмоции, завернутые в мягкую ткань ироничного басенного повествования. Это мощный поток смыслов, вырывающих сознание из привычного бытия и уносящих в мир грез, туда, где царит только добро, и где всем нам порой хочется оказаться.`;

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://cdn.jsdelivr.net/gh/vulnonas/art-images@main/Main.webp" 
          alt="Art Gallery" 
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-white mb-4">
              Валерий Багаев
            </h1>
            <p className="text-xl md:text-2xl text-[#e2d2bb] mb-8">
              Художник • Живописец • Творец
            </p>
            <Link 
              to="/gallery" 
              className="inline-flex items-center bg-[#586552] text-[#e2d2bb] px-6 py-3 rounded-full hover:bg-[#586552]/90 transition-colors group"
            >
              Смотреть работы
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Artist Bio Section */}
      <section 
        ref={bioSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white slide-up ${bioSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <ArtistBio 
            photo="https://images.pexels.com/photos/7242858/pexels-photo-7242858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            name="Валерий Багаев"
            bio={artistBio}
          />
        </div>
      </section>

      {/* Exhibitions Section */}
      <section 
        ref={exhibitionsSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-[#e2d2bb]/10 fade-in-right ${exhibitionsSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Выставки и мероприятия" 
            subtitle="Узнайте о предстоящих и прошедших выставках"
            centered
          />
          
          <div className="mt-12">
            <ExhibitionsSlider exhibitions={exhibitions} />
          </div>
        </div>
      </section>

      {/* Featured Works Section */}
      <section 
        ref={worksSection.ref as React.RefObject<HTMLElement>}
        className={`py-20 bg-white scale-up ${worksSection.isVisible ? 'visible' : ''}`}
      >
        <div className="container mx-auto px-4">
          <SectionTitle 
            title="Мои работы, словно дети для меня, и ради каждой из них я выкладываюсь по полной!" 
            subtitle="Познакомьтесь с некоторыми из моих произведений"
            centered
          />
          
          <ArtworkGrid 
            artworks={featuredArtworks.slice(0, 5)} 
            featuredIndex={0}
          />
          
          <div className="mt-12 text-center">
            <Link 
              to="/gallery" 
              className="inline-flex items-center text-[#586552] font-medium group"
            >
              Смотреть все работы
              <ArrowRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;