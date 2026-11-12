const IconArrow = ({ onClick, isShown }) => {
  const shownColor = isShown ? "text-zinc-600 rotate-180" : "text-zinc-400";
  return (
    <button className={`flex items-center justify-center h-9 w-9 duration-100 ${shownColor}`} onClick={onClick}>
      ▼
    </button>
  );
};

export default IconArrow;
