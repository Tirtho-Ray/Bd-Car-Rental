import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const TextAnimation = () => {
  const lettersRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    gsap.fromTo(
      lettersRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="flex gap-3 font-bold">
      {["R", "A", "N", "T", "N", "O", "W"].map((letter, index) => (
        <p
          key={index}
          ref={(el) => {
            if (el) lettersRef.current[index] = el;
          }}
          className={`text-sm text-yellow-400 mb-4 ${
            letter === "N" && index === 4 ? "ml-4" : ""
          }`}
        >
          {letter}
        </p>
      ))}
    </div>
  );
};

export default TextAnimation;
