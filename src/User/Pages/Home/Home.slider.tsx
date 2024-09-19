import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdOutlineArrowOutward } from 'react-icons/md';
import { Link } from 'react-router-dom';

const images = [
    'https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/3.jpg',
    'https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/11.jpg',
    'https://webredox.net/demo/wp/renax/wp-content/uploads/2024/04/1.jpg'
];

const fadeUpAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const HomeSlide: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 10000); // Change image every 10 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex items-center justify-start w-full h-screen overflow-hidden px-3 md:px-10  ">
            <motion.div
                key={currentIndex}
                className="absolute inset-0 bg-cover bg-center"
                initial={{ scale: 1.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.5 }}
                transition={{ duration: 10, ease: "easeInOut" }}
                style={{ backgroundImage: `url(${images[currentIndex]})` }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <div className="absolute flex flex-col items-start justify-center text-left text-white p-10 xl:px-24 inset-0 bg-black bg-opacity-30">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpAnimation}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-yellow-400 mb-4"
                >
                    <span className="text-xl">*</span> <span>P R E M I U M</span>
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpAnimation}
                    transition={{ duration: 1, delay: 1 }}
                    className="mb-8"
                >
                    <p className="text-4xl lg:text-6xl md:text-5xl mb-4 font-bold">Rental Car</p>
                    <p className="text-white font bold">You Have Rent Any Our Luxurious Car</p>
                </motion.div>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpAnimation}
                    transition={{ duration: 1, delay: 1.5 }}
                    className="flex gap-4 "
                >
                        <button className="md:px-6 md:py-4 px-3 py-2 border rounded-full  transition-transform duration-300 ease-in-out transform hover:translate-y-[-3px] hover:bg-yellow-400 ">
                        <span className='flex items-center gap-2'> <span> View Details</span> <span><MdOutlineArrowOutward /></span></span>
                            </button>                   
                        <button className="md:px-6 md:py-4 px-3 py-2 border rounded-full  transition-transform duration-300 ease-in-out transform hover:translate-y-[-3px] hover:bg-yellow-400 ">
                          <Link to="/all-cars">
                          <span className='flex items-center gap-2'> <span> Rant Now</span> <span><MdOutlineArrowOutward /></span></span>
                          </Link>
                            </button>                   
                      
                </motion.div>
            </div>
        </div>
    );
};

export default HomeSlide;
