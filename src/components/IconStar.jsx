const StarIcon = ({ onClick, isFavorite }) => {
  const favoriteColor = isFavorite ? "text-amber-500" : "text-zinc-400";
  return (
    <button className={`flex items-center justify-center h-9 w-9 text-2xl leading-none ${favoriteColor}`} onClick={onClick}>
      ✶
    </button>
  );
};

export default StarIcon;
