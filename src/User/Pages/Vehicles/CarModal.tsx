import React, { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { TCars } from "../../../Types/TCar";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from "swiper/modules";
import gsap from "gsap";

interface CarModalProps {
  car: TCars | null;
  isOpen: boolean;
  onClose: () => void;
}

const CarModal: React.FC<CarModalProps> = ({ car, isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backgroundRef.current && !modalRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1 , ease: "back.out(1.7)" }
      );
      document.body.classList.add('scroll-lock');
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "back.in(1.7)",
        onComplete: () => {
          document.body.classList.remove('scroll-lock');
        }
      });
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !car) return null;

  return (
    <div
      ref={backgroundRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-sm overflow-hidden shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 md:p-8 relative max-h-[90vh] overflow-y-auto flex flex-col"
      >
        <button
          onClick={onClose}
          className="absolute top-1 right-1 md:top-2 md:right-2 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors duration-300"
        >
          <FaTimes size={10} className="text-gray-800" />
        </button>

        {/* Car Image Slider */}
        <div className="relative w-[270px] md:w-[430px] lg:w-[500px] h-32 sm:h-56 md:h-40 lg:h-40 mb-4 mx-auto">
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            modules={[Navigation, Autoplay]}
            className="w-full h-full"
          >
            {car.featuresImage?.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Feature Image ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Car Details */}
        <div className="flex flex-col space-y-4">
          <h2 className="text-sm md:text-xl font-bold text-gray-900">{car.name}</h2>
          <div className="flex flex-col md:flex-row md:space-x-4">
            {/* Extra Information */}
            <div className="flex-1 space-y-2">
              <h3 className="text-md font-semibold text-gray-800 ">Extra Information</h3>
              <ul className="text-gray-700 md:text-[15px] sm:text-base">
                {car.extra?.map((item, index) => (
                  <li key={index} className="mb-2">
                    <div className="text-[14px]"><strong>Age:</strong> {item.age} years</div>
                    <div  className="text-[14px]"><strong>Seats:</strong> {item.seats}</div>
                    <div  className="text-[14px]"><strong>Large Bags:</strong> {item.largeBags}</div>
                    <div  className="text-[14px]"><strong>Small Bags:</strong> {item.smallBags}</div>
                    <div  className="text-[14px]"><strong>Engine Capacity:</strong> {item.engineCapacity}</div>
                    <div  className="text-[14px]"><strong>Transmission:</strong> {item.transmission}</div>
                    <div  className="text-[14px]"><strong>Fuel Type:</strong> {item.fuelType}</div>
                    <div  className="text-[14px]"><strong>Fuel Consumption:</strong> {item.fuelConsumption}</div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Features Information */}
            <div className="flex-1 space-y-2 mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-gray-800">Features</h3>
              <ul className="list-disc pl-5 text-gray-700 text-sm sm:text-base md:text-[15px]">
                {car.features?.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <span className="text-lg font-bold text-yellow-600">
              ${car.pricePerHour} <span className="text-sm">/ Hr</span>
            </span>
            <button className="bg-yellow-500 text-white px-5 py-2 rounded-full hover:bg-yellow-600 transition-colors duration-300 mt-4 sm:mt-0">
              Rent Now
            </button>
          </div>
          <p className="text-sm md:text-xl text-center mt-1 mb-2 font-bold line">Details</p>
          <p className="text-gray-700 md:text-[15px] sm:text-base text-center">{car.description}</p>

        </div>
      </div>
    </div>
  );
};

export default CarModal;
