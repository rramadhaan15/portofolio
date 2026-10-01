import React, { useState, useEffect } from "react";
import { FaCampground, FaFire, FaTint, FaHotTub, FaHiking } from "react-icons/fa";

interface OptionItem {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  options?: OptionItem[];
  title?: string;
  subtitle?: string;
}

const defaultOptions: OptionItem[] = [
  {
    title: "Luxury Tent",
    description: "Cozy glamping under the stars",
    image: "https://cdn.21st.dev/assets/mirror/31/31ee902b46038d690f949a8be82c4b5673d554eac7456974c04950d78b4efe3d.jpg",
    icon: <FaCampground size={24} className="text-white" />,
  },
  {
    title: "Campfire Feast",
    description: "Gourmet s'mores & stories",
    image: "https://cdn.21st.dev/assets/mirror/3b/3b6c78ba5a375a240a6452b7c68a889228d52aba6e18e355b77f04472e4e0e76.jpg",
    icon: <FaFire size={24} className="text-white" />,
  },
  {
    title: "Lakeside Retreat",
    description: "Private dock & canoe rides",
    image: "https://cdn.21st.dev/assets/mirror/97/97103cb7b8ac5adbbd3e64c7410560b04a83b056daa580ee1b0353f774ec8d3d.jpg",
    icon: <FaTint size={24} className="text-white" />,
  },
  {
    title: "Mountain Spa",
    description: "Outdoor sauna & hot tub",
    image: "https://cdn.21st.dev/assets/mirror/9f/9fff1299ab7c6ec1a4b42e57e2ec6853fee03efe144bb054a494ec9c1e145d23.jpg",
    icon: <FaHotTub size={24} className="text-white" />,
  },
  {
    title: "Guided Adventure",
    description: "Expert-led nature tours",
    image: "https://cdn.21st.dev/assets/mirror/9f/9f4d6686c3ee21321e110920cfd3b8109d15f61ab2972dfafdeb1f1b1099c568.jpg",
    icon: <FaHiking size={24} className="text-white" />,
  },
];

export const InteractiveSelector: React.FC<InteractiveSelectorProps> = ({
  options = defaultOptions,
  title = "Escape in Style",
  subtitle = "Discover luxurious camping experiences in nature’s most breathtaking spots.",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] w-full bg-[#18181b] dark:bg-black font-sans text-white py-12 px-4 overflow-hidden">
      {/* Header Section */}
      <div className="w-full max-w-2xl px-4 mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight drop-shadow-lg">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-gray-300 font-medium max-w-xl mx-auto">
          {subtitle}
        </p>
      </div>

      {/* Options Container */}
      <div className="options flex w-full max-w-[960px] h-[360px] sm:h-[420px] mx-auto items-stretch overflow-hidden relative rounded-2xl border border-neutral-800">
        {options.map((option, index) => (
          <div
            key={index}
            className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? "active" : ""}
            `}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backfaceVisibility: "hidden",
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-40px)",
              minWidth: "55px",
              cursor: "pointer",
              backgroundColor: "#18181b",
              boxShadow:
                activeIndex === index
                  ? "0 20px 60px rgba(0,0,0,0.50)"
                  : "0 10px 30px rgba(0,0,0,0.30)",
              flex: activeIndex === index ? "6 1 0%" : "1 1 0%",
              zIndex: activeIndex === index ? 10 : 1,
              position: "relative",
              borderRight: index < options.length - 1 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Dark overlay for inactive or active background */}
            <div
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
              style={{
                backgroundColor:
                  activeIndex === index ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.7)",
              }}
            />

            {/* Bottom Shadow Gradient */}
            <div
              className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
              style={{
                bottom: "0",
                height: "140px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
              }}
            />

            {/* Label with icon and info */}
            <div className="label absolute left-0 right-0 bottom-4 flex items-center justify-start h-14 z-20 pointer-events-none px-3 sm:px-4 gap-3 w-full">
              <div className="icon min-w-[42px] max-w-[42px] h-[42px] flex items-center justify-center rounded-full bg-[rgba(24,24,27,0.85)] backdrop-blur-md shadow-md border border-white/20 flex-shrink-0 transition-transform duration-300">
                {option.icon}
              </div>
              <div className="info text-white overflow-hidden whitespace-nowrap">
                <div
                  className="main font-bold text-base sm:text-lg transition-all duration-500 ease-in-out truncate"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  {option.title}
                </div>
                <div
                  className="sub text-xs sm:text-sm text-gray-300 transition-all duration-500 ease-in-out truncate"
                  style={{
                    opacity: activeIndex === index ? 1 : 0,
                    transform:
                      activeIndex === index ? "translateX(0)" : "translateX(20px)",
                  }}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InteractiveSelector;
