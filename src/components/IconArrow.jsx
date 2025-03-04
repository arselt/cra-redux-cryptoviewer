const IconArrow = ({ onClick, isShown }) => {
  const favoriteColor = isShown ? "text-zinc-600 rotate-180 tra" : "text-zinc-500";
  return (
    <button className={`text-base	 duration-100 ${favoriteColor}`} onClick={onClick}>
      ▼
    </button>
  );
};

export default IconArrow;
