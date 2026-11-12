const StarIcon = ({ onClick, isFavorite, label }) => {
  const favoriteColor = isFavorite ? "text-favorite" : "text-idle";
  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={`${label} favorite`}
      className={`flex items-center justify-center h-9 w-9 text-2xl leading-none ${favoriteColor}`}
      onClick={onClick}
    >
      <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
    </button>
  );
};

export default StarIcon;
