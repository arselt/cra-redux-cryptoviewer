const StarIcon = (isFavorite, onClick) => {
  const favoriteColor = isFavorite ? "text-amber-600" : "text-zinc-800";
  return <button className={`text-3xl ${favoriteColor}`} onClick={() => onClick}></button>;
};

export default StarIcon;
