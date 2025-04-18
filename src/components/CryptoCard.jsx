import { useState } from "react";
import CryptoDetailsCard from "./CryptoDetailsCard";
import IconArrow from "./IconArrow";
import IconStar from "./IconStar";
import { useDispatch } from "react-redux";
import { setFavorite } from "../actions";

const CryptoCard = ({
  cryptoId,
  cryptoName,
  cryptoValue,
  cryptoTicker,
  cryptoChangeDay,
  cryptoImage,
  cryptoFavorite
}) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);

  const handleDetailClick = () => {
    setIsShown((current) => !current);
  };

  const handleFavoriteClick = () => {
    dispatch(setFavorite({ cryptoId: cryptoId }))
  }

  cryptoChangeDay == null || undefined ? cryptoChangeDay = 0: cryptoChangeDay;
  
  return (
    <article className="break-inside-avoid-column bg-zinc-200 flex flex-wrap w-full md:max-w-sm rounded-2xl shadow-xl mb-6 mx-auto mx-2">
      <div className="flex items-center justify-between w-full h-20 shadow-lg rounded-2xl px-2">
        <div className="flex items-center">
          <img src={cryptoImage} alt="" className="w-6 h-6" loading="lazy"/>
          <h3 className="text-2xl capitalize ml-2">{cryptoName}</h3>
        </div>
        <div className="flex items-center text-end">
          <div className="flex flex-col mr-2">
            <span className="text-base uppercase">
              {cryptoValue} {cryptoTicker}
            </span>
            <span
              className={`text-sm uppercase 
              ${cryptoChangeDay >= 0 ? "text-emerald-600" : "text-rose-500"}
              `}
            >
              {cryptoChangeDay >= 0 ? `+${cryptoChangeDay.toFixed(2)}` : cryptoChangeDay.toFixed(2)}
              %
            </span>
          </div>
          <div className="flex flex-col">
            <IconStar onClick={handleFavoriteClick} isFavorite={cryptoFavorite}/>
            <IconArrow onClick={handleDetailClick} isShown={isShown} />
          </div>
        </div>
      </div>
      {/* 👇️ show component on click */}
      {isShown && <CryptoDetailsCard cryptoId={cryptoId} />}
    </article>
  );
};

export default CryptoCard;
