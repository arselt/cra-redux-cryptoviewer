const StarIcon = ({ onClick, isFavorite }) => {
  const favoriteColor = isFavorite ? "text-favorite" : "text-idle";
  return (
    <button className={`flex items-center justify-center h-9 w-9 text-2xl leading-none ${favoriteColor}`} onClick={onClick}>
      ✶
    </button>
  );
};

export default StarIcon;
