const IconArrow = ({ onClick, isShown }) => {
  const favoriteColor = isShown ? "text-zinc-600 rotate-180 tra" : "text-zinc-400";
  return (
    <button className={`text-1xl	 duration-100 ${favoriteColor}`} onClick={onClick}>
      ▼
    </button>
  );
};

export default IconArrow;
