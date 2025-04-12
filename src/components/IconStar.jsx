const StarIcon = ({ onClick, isFavorite }) => {
  const favoriteColor = isFavorite ? "text-amber-500" : "text-zinc-400";
  return <button className={`text-2xl leading-none pt-1 ${favoriteColor}`} onClick={onClick}> ✶ </button>;
};

export default StarIcon;
