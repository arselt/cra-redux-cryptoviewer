const IconArrow = ({ onClick, isShown }) => {
  const shownColor = isShown ? "text-idle rotate-180" : "text-idle";
  return (
    <button className={`flex items-center justify-center h-9 w-9 duration-100 ${shownColor}`} onClick={onClick}>
      ▼
    </button>
  );
};

export default IconArrow;
