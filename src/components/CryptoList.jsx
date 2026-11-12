import { useId } from "react";
import CryptoCard from "./CryptoCard";
import { usePrefs } from "../prefs";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

// Masonry shrinks to the item count (one favorite would stretch full width), so short lists use a grid
const CryptoList = ({ cryptos, title, isLoading = false, isGrid = false, children }) => {
  const { t } = usePrefs();
  const loading = isLoading;

  const headingId = useId();
  const cards = cryptos.map((crypto) => (
    <CryptoCard
      key={crypto.id}
      cryptoId={crypto.id}
      cryptoName={crypto.name}
      cryptoValue={crypto.current_price}
      cryptoChangeDay={crypto.price_change_percentage_24h}
      cryptoImage={crypto.image}
      cryptoFavorite={crypto.favorite}
      crypto={crypto}
    />
  ));

  return (
    <section aria-labelledby={headingId} aria-busy={loading} className="mt-5 px-6 gap-8 pb-5 lg:max-w-7xl mx-auto">
      <h2 id={headingId} className="text-2xl font-medium px-2 pb-5 capitalize">{title}</h2>
      { loading ? 
        <SkeletonTheme baseColor="rgb(var(--card))" highlightColor="rgb(var(--line))">
        <div role="status" className="grid min-[750px]:grid-cols-2 min-[900px]:grid-cols-3 gap-4">
          <span className="sr-only">{t("list.loading")}</span>
          {Array(30)
          .fill(true)
          .map((_, i) => (
            <Skeleton key={i} borderRadius="16px" className={"w-full rounded-2xl h-20"} />
          ))}
        </div>
        </SkeletonTheme>
      : isGrid ?
        <div className="grid items-start gap-4 min-[750px]:grid-cols-2 min-[900px]:grid-cols-3">{cards}</div>
      :
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} >
          <Masonry gutter="1rem">
            {cards}
          </Masonry>
        </ResponsiveMasonry>
      }
      {children}
    </section>
  );
};

export default CryptoList;
