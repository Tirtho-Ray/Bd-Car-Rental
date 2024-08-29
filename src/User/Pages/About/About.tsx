import AboutContent from "./AboutContent";
import AboutPlay from "./AboutPlay";


const About = () => {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      {/* Background image container */}
      <div className="fixed top-0 left-0 w-full h-[500px] overflow-hidden z-0">
        <img
          className="w-full h-full object-cover"
          src="https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/1.jpg"
          alt="Descriptive Alt Text"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content container */}
      <div className="relative z-10 mt-[500px] bg-white dark:bg-dark-6 px-8 py-12 flex-grow">
        <AboutContent />
        <AboutPlay />
      </div>

      {/* Footer */}
    
    </div>
  );
};

export default About;
