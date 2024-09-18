import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import img1 from '../../../assets/BD/b1.png';
import img2 from '../../../assets/BD/b2.png';
import img3 from '../../../assets/BD/b3.png';
import img4 from '../../../assets/BD/b4.png';
import img5 from '../../../assets/BD/b5.png';
import img6 from '../../../assets/BD/b6.png';
import img7 from '../../../assets/BD/b7.png';
import img8 from '../../../assets/BD/b8.png';
import img9 from '../../../assets/BD/b9.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ImageData {
  src: string;
  description: string;
}

const GoBd: React.FC = () => {
  const titleRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    // BD effect for the title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current.children,
        { y: 0 },
        {
          y: 20,
          ease: "power1.inOut",
          duration:3,
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.1,
            from: "center",
          },
        }
      );
    }

    // GSAP animation for the images and descriptions
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const img = section.querySelector<HTMLDivElement>('.image');
        const desc = section.querySelector<HTMLDivElement>('.description');

        if (img && desc) {
          // GSAP animation for the image
          gsap.fromTo(img,
            { x: index % 2 === 0 ? -150 : 150, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );

          // GSAP animation for the description
          gsap.fromTo(desc,
            { x: index % 2 === 0 ? 150 : -150, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      }
    });
  }, []);

  const images: ImageData[] = [
    { src: img1, description: 'Beautiful Sundarbans' },
    { src: img2, description: 'Majestic Mountains of Bandarban' },
    { src: img3, description: 'Golden Temples of Paharpur' },
    { src: img4, description: 'Lush Tea Gardens in Sylhet' },
    { src: img5, description: 'Cox’s Bazar, World’s Longest Sea Beach' },
    { src: img6, description: 'Historical Ahsan Manzil' },
    { src: img7, description: 'Colorful Dhaka City' },
    { src: img8, description: 'Saint Martin’s Coral Island' },
    { src: img9, description: 'Greenery of Srimangal' },
  ];

  return (
    <div className="mt-10 mb-6 text-white px-2 md:px-14">
        {/* Animated Explore Bangladesh Title with Sea Waves Effect */}
        <div className="text-center text-xl md:text-3xl font-bold mt-20 mb-16 tracking-wide flex justify-center space-x-1" ref={titleRef}>
          {"Explore Bangladesh".split("").map((letter, index) => (
            <span key={index} className="inline-block">
              {letter}
            </span>
          ))}
        </div>
        
      {images.map((image, index) => (
        <div
          key={index}
          className={`flex flex-col-reverse md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center mb-12 px-4 md:px-0`}
          ref={el => sectionRefs.current[index] = el}
        >
          {/* Image Section */}
          <div className="image w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={image.src}
              alt={image.description}
              className="w-full h-auto object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
          {/* Description Section */}
          <div className="description w-full md:w-1/2 text-center md:text-left px-4 md:px-12">
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">{image.description}</h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Explore the stunning beauty of {image.description} with breathtaking views and natural wonders.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoBd;
