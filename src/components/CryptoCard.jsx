import { useState } from "react";
import CryptoDetailsCard from "./CryptoDetailsCard";

const CryptoCard = ({
  cryptoId,
  cryptoName,
  cryptoValue,
  cryptoTicker,
  cryptoChangeDay,
  cryptoImage
}) => {
  const [isShown, setIsShown] = useState(false);

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  return (
    <article
      onClick={handleClick}
      className="bg-zinc-200 flex flex-wrap w-full min-w-{280} max-w-sm rounded-2xl shadow-xl"
    >
      <div className="flex items-center justify-between w-full max-w-sm h-20 shadow-lg rounded-2xl px-2">
        <div className="flex items-center">
          <img src={cryptoImage} alt="" className="w-8 h-8" />
          <h3 className="text-2xl capitalize ml-2">{cryptoName}</h3>
        </div>
        <div className="flex items-end text-end flex-col">
          <span className="text-base uppercase">
            {cryptoValue} {cryptoTicker}
          </span>
          <span
            className={`text-sm uppercase 
            ${cryptoChangeDay >= 0 ? "text-emerald-600" : "text-rose-500"}
            `}
          >
            {cryptoChangeDay >= 0 ? `+${cryptoChangeDay.toFixed(2)}` : cryptoChangeDay.toFixed(3)}%
          </span>
        </div>
      </div>
      {/* 👇️ show component on click */}
      {isShown && <CryptoDetailsCard cryptoId={cryptoId} />}
    </article>
  );
};

export default CryptoCard;
