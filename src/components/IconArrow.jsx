import { ChevronIcon } from "./icons";

const IconArrow = ({ onClick, isShown, label, controls }) => {
  return (
    <button
      type="button"
      aria-expanded={isShown}
      aria-controls={controls}
      aria-label={label}
      className={`flex items-center justify-center h-9 w-9 text-idle duration-100 motion-reduce:transition-none ${isShown ? "rotate-180" : ""}`}
      onClick={onClick}
    >
      <ChevronIcon className="h-6 w-6" />
    </button>
  );
};

export default IconArrow;
