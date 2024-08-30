
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader: React.FC = () => {
    const carRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const carElement = carRef.current;

        if (carElement) {
            gsap.to(carElement, {
                x: 100,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                duration: 1,
            });
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <svg
                ref={carRef}
                width="100"
                height="50"
                viewBox="0 0 64 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect x="8" y="16" width="48" height="8" fill="gray" />
                <circle cx="16" cy="28" r="4" fill="black" />
                <circle cx="48" cy="28" r="4" fill="black" />
                <rect x="16" y="12" width="32" height="8" fill="darkred" />
                <rect x="20" y="8" width="24" height="8" fill="red" />
            </svg>
        </div>
    );
};

export default Loader;
