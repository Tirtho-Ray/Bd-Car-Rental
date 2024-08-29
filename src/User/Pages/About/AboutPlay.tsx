import img from '../../../assets/slide car/1.png';
import { CiPlay1 } from 'react-icons/ci';
import './about.css'

const AboutPlay = () => {
    return (
        <div className="relative h-screen mt-5">
            <img 
                src={img} 
                alt="Car Promo" 
                className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 bg-black bg-opacity-50 p-10 border1">
                <p className="text-yellow-400 text-lg mb-4">E X P L O R E</p>
                <p className="text-white text-4xl font-bold mb-6">
                    Car <span className="text-yellow-300">Promo</span> video
                </p>
                <CiPlay1 className="text-white text-6xl" />
            </div>
        </div>
    );
};

export default AboutPlay;
