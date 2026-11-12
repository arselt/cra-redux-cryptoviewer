import { StarFilledIcon, StarOutlineIcon } from "./icons";

const StarIcon = ({ onClick, isFavorite, label }) => {
  const favoriteColor = isFavorite ? "text-favorite" : "text-idle";
  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={label}
      className={`flex items-center justify-center h-9 w-9 ${favoriteColor}`}
      onClick={onClick}
    >
      {isFavorite ? <StarFilledIcon className="h-6 w-6" /> : <StarOutlineIcon className="h-6 w-6" />}
    </button>
  );
};

export default StarIcon;
