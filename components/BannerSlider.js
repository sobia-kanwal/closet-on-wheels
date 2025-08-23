// components/BannerSlider.js
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BannerSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzaGlvbiUyMGJhbm5lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60",
      title: "Fashion Collection",
      subtitle: "Rent Designer Outfits for Every Occasion",
      description: "Get access to premium fashion without the price tag",
      cta: "Explore Fashion",
      link: "/category/fashion",
      overlay: "bg-gradient-to-r from-pink-500/20 to-purple-500/20"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3f极速加速器MHxzZWFyY2h8NHx8aG9tZSUyMGRlY29yfGVufDB8fDB8fHww&auto=format&fit=crop&w=1200&q=60",
      title: "Home Essentials",
      subtitle: "Transform Your Space with Premium Items",
      description: "From furniture to decor, find everything for your home",
      cta: "Browse Home Items",
      link: "/category/home",
      overlay: "bg-gradient-to-r from-blue-500/20 to-teal-500/20"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXZlbnQlMjBkZWNvcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1200&q=60",
      title: "Event Supplies",
      subtitle: "Everything You Need for Memorable Events",
      description: "Make your events special with our rental collection",
      cta: "Discover Events",
      link: "/category/events",
      overlay: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            <div className={`absolute inset-0 ${slide.overlay}`}></div>
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="w-full md:w-1/2">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-md">{slide.title}</h2>
              <h3 className="text-xl text-white mb-4 drop-shadow-md">{slide.subtitle}</h3>
              <p className="text-white mb-6 drop-shadow-md">{slide.description}</p>
              <Link href={slide.link}>
                <div className="bg-purple-600 text-white px-6 py-3 rounded-sm hover:bg-purple-700 transition duration-300 inline-block transform hover:scale-105">
                  {slide.cta}
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerSlider;