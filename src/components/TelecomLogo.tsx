
const TelecomLogo = () => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className="w-full h-full" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="telecom-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="white" stroke="url(#telecom-gradient)" strokeWidth="3" />
      <path 
        d="M32 35C32 35 38 30 50 30C62 30 68 35 68 35M28 50C28 50 37 40 50 40C63 40 72 50 72 50M30 65C30 65 37 55 50 55C63 55 70 65 70 65" 
        stroke="url(#telecom-gradient)" 
        strokeWidth="3" 
        strokeLinecap="round" 
        fill="none" 
      />
    </svg>
  );
};

export default TelecomLogo;
