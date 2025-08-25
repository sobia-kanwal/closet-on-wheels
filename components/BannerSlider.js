// components/BannerSlider.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  
  const slides = [
    {
      id: 1,
      image: "/images/categories/Pakistani-Bridal-Wear-Designers.jpg",
      title: "Fashion Collection",
      subtitle: "Rent Designer Outfits for Every Occasion",
      description: "Get access to premium fashion without the price tag",
      cta: "Explore Fashion",
      link: "/category/fashion",
      bgColor: "bg-pink-50",
      pattern: "pattern-dots",
      patternColor: "text-pink-200"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=80",
      title: "Home Essentials",
      subtitle: "Transform Your Space with Premium Items",
      description: "From furniture to decor, find everything for your home",
      cta: "Browse Home Items",
      link: "/category/home",
      bgColor: "bg-blue-50",
      pattern: "pattern-lines",
      patternColor: "text-blue-200"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=80",
      title: "Event Supplies",
      subtitle: "Everything You Need for Memorable Events",
      description: "Make your events special with our rental collection",
      cta: "Discover Events",
      link: "/category/events",
      bgColor: "bg-purple-50",
      pattern: "pattern-squares",
      patternColor: "text-purple-200"
    }
  ];

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
    setProgress(0); // Reset progress when manually changing slide
  };

  // Go to next slide
  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  // Go to previous slide
  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  useEffect(() => {
    if (isHovered) return; // Pause progress when hovered
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
          return 0;
        }
        return prev + 0.5; // Adjust this value to control progress speed
      });
    }, 25); // Adjust interval for smoother progress

    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  return (
    <div 
      className="relative h-screen md:h-96 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out ${slide.bgColor} ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Geometric pattern background */}
          <div className={`absolute inset-0 w-full h-full opacity-30 ${slide.patternColor} ${slide.pattern}`}></div>
          
          {/* Mobile image - covers full banner */}
          <div className="md:hidden absolute inset-0 w-full h-full">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for better text visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="w-full md:w-1/2 text-white md:text-gray-800">
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <h3 className="text-xl text-purple-300 md:text-purple-600 mb-4">{slide.subtitle}</h3>
              <p className="text-gray-200 md:text-gray-600 mb-6">{slide.description}</p>
              <Link href={slide.link}>
                <div className="bg-purple-600 text-white px-6 py-3 rounded-sm hover:bg-purple-700 transition duration-300 inline-block cursor-pointer">
                  {slide.cta}
                </div>
              </Link>
            </div>
            <div className="hidden md:block md:w-1/2">
              <div className="h-72 rounded-lg flex items-center justify-center overflow-hidden">
                <img src={slide.image} alt={slide.title} className="h-full w-full object-cover rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={goToNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Navigation dots with progress indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="relative w-10 h-3 flex items-center justify-center"
          >
            <div className="w-10 h-1 bg-gray-300/70 rounded-full overflow-hidden">
              {index === currentSlide ? (
                <div 
                  className="h-full bg-purple-600 transition-all duration-300 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              ) : null}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;