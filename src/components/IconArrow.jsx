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
      <span aria-hidden="true">▼</span>
    </button>
  );
};

export default IconArrow;
