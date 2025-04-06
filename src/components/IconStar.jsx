const StarIcon = (isFavorite, onClick) => {
  const favoriteColor = isFavorite ? "text-zinc-400" : "text-amber-200";
  return <button className={`text-2xl leading-none ${favoriteColor}`} onClick={() => onClick}> ★ </button>;
};

export default StarIcon;
