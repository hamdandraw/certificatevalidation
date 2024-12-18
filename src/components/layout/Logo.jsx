export const Logo = () => (
  <div className="flex-shrink-0">
    <svg
      className="h-12 w-12 text-white"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylized Drone Icon */}
      <path
        d="M20 5L35 20L20 35L5 20L20 5Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="20"
        cy="20"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M14 14L26 26M14 26L26 14"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  </div>
);