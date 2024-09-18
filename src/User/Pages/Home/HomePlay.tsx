import { useState } from 'react';
import img from '../../../assets/slide car/1.png';
import { CiPlay1 } from 'react-icons/ci';

const HomePlay = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Close modal if clicking outside the video (background)
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Ensure only backdrop clicks trigger the modal close, not clicks inside the video content
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="relative h-screen mt-5">
      {/* Background Image */}
      <img 
        src={img} 
        alt="Car Promo" 
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 bg-black bg-opacity-50 p-10">
        <p className="text-yellow-400 text-lg mb-4">E X P L O R E</p>
        <p className="text-white text-4xl font-bold mb-6">
          Car <span className="text-yellow-300">Promo</span> video
        </p>
        <CiPlay1 
          className="text-white text-6xl cursor-pointer" 
          onClick={handlePlayClick} 
        />
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50"
          onClick={handleBackdropClick} // Handles outside clicks
        >
          <div className="relative w-full h-full max-w-5xl p-4">
            {/* YouTube Video */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/74MElFM0Y9s?autoplay=1"
                title="YouTube video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePlay;
