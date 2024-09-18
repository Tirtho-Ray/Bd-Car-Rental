import { useEffect } from 'react';
import { gsap } from 'gsap';
// import logo from '../../../assets/logo/i1.png';
import logo1 from '../../../assets/logo/i2.png';
import logo2 from '../../../assets/logo/i3.png';
import logo3 from '../../../assets/logo/i4.png';
import logo4 from '../../../assets/logo/i5.png';
import logo5 from '../../../assets/logo/i6.png';

const HomeHero = () => {
  // GSAP animation
  useEffect(() => {
    gsap.to('.logo', {
      scale: 1.5,
      repeat: -1, // infinite loop
      yoyo: true, // animates back and forth
      duration: 2, // duration of animation
      stagger: 0.3, // delay between each logo animation
      ease: 'power1.inOut', // easing for smooth animation
    });
  }, []);

  return (
    <div className="flex justify-center items-center py-10">
      <div className="flex flex-wrap justify-center gap-5">
        {/* <img src={logo} alt="Logo 1" className="logo w-24 md:w-36 lg:w-48" /> */}
        <img src={logo1} alt="Logo 2" className="logo w-24 md:w-36 lg:w-48" />
        <img src={logo2} alt="Logo 3" className="logo w-24 md:w-36 lg:w-48" />
        <img src={logo3} alt="Logo 4" className="logo w-24 md:w-36 lg:w-48" />
        <img src={logo4} alt="Logo 5" className="logo w-24 md:w-36 lg:w-48" />
        <img src={logo5} alt="Logo 6" className="logo w-24 md:w-36 lg:w-48" />
      </div>
    </div>
  );
};

export default HomeHero;
