import { useId, useState } from "react";
import CryptoDetailsCard from "./CryptoDetailsCard";
import IconArrow from "./IconArrow";
import IconStar from "./IconStar";
import { useDispatch } from "react-redux";
import { setFavorite } from "../actions";
import { formatPercent } from "../utils/format";
import { usePrefs } from "../prefs";

const CryptoCard = ({
  cryptoId,
  cryptoName,
  cryptoValue,
  cryptoChangeDay,
  cryptoImage,
  cryptoFavorite,
  crypto
}) => {
  const { t, locale, money } = usePrefs();
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(false);
  const detailsId = useId();

  const handleDetailClick = () => {
    setIsShown((current) => !current);
  };

  const handleFavoriteClick = () => {
    dispatch(setFavorite({ cryptoId: cryptoId }))
  }

  cryptoChangeDay == null || undefined ? cryptoChangeDay = 0: cryptoChangeDay;
  
  return (
    <article className="crypto-card break-inside-avoid-column bg-card border border-line flex flex-wrap w-full rounded-2xl shadow-md hover:shadow-xl transition-shadow motion-reduce:transition-none">
      <div className="flex items-center justify-between gap-2 w-full h-20 shadow-lg rounded-2xl px-3">
        <div className="flex items-center min-w-0">
          <img src={cryptoImage} alt="" className="w-7 h-7 shrink-0 rounded-full" loading="lazy"/>
          <h3 title={cryptoName} className="crypto-card-name capitalize truncate mx-2">{cryptoName}</h3>
        </div>
        <div className="flex items-center text-end shrink-0">
          <div className="flex flex-col mr-1">
            <span className="text-base font-medium tabular-nums">{money(cryptoValue)}</span>
            <span className={`text-sm tabular-nums ${cryptoChangeDay >= 0 ? "text-positive" : "text-negative"}`}>
              {formatPercent(cryptoChangeDay, locale)}
            </span>
          </div>
          <div className="flex flex-col">
            <IconStar onClick={handleFavoriteClick} isFavorite={cryptoFavorite} label={cryptoFavorite ? t("card.removeFavorite", { name: cryptoName }) : t("card.addFavorite", { name: cryptoName })} />
            <IconArrow onClick={handleDetailClick} isShown={isShown} label={isShown ? t("card.hideDetails", { name: cryptoName }) : t("card.showDetails", { name: cryptoName })} controls={detailsId} />
          </div>
        </div>
      </div>
      {/* 👇️ show component on click */}
      {isShown && <CryptoDetailsCard detailsId={detailsId} cryptoId={cryptoId} cryptoName={cryptoName} crypto={crypto} />}
    </article>
  );
};

export default CryptoCard;
