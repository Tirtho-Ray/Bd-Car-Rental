import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import the ScrollTrigger plugin
import l1 from '../../../assets/ster/hero1.png';
import l2 from '../../../assets/ster/hero2.png';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomeStar = () => {
  useEffect(() => {
    // Animate the left and right images when they enter the viewport
    gsap.fromTo(
      '.left-card',
      { opacity: 0, x: -200 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.left-card', // Element to trigger the animation
          start: 'top 80%', // Animation starts when the top of the element is 80% from the top of the viewport
        },
      }
    );

    gsap.fromTo(
      '.right-card',
      { opacity: 0, x: 200 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.right-card',
          start: 'top 80%',
        },
      }
    );
  }, []);

  return (
    <div className="flex justify-center items-center gap-3  md:gap-3 py-10 ">
      <img src={l1} alt="Star 1" className="left-card w-[180px] md:w-[350px] lg:w-[600px]" />
      <img src={l2} alt="Star 2" className="right-card w-[180px] md:w-[350px] lg:w-[600px]" />
    </div>
  );
};

export default HomeStar;
