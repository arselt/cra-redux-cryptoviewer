import { useId } from "react";
import CryptoCard from "./CryptoCard";
import { usePrefs } from "../prefs";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const CryptoList = ({ cryptos, title, isLoading = false, children }) => {
  const { t } = usePrefs();
  const loading = isLoading;

  const headingId = useId();
  return (
    <section aria-labelledby={headingId} aria-busy={loading} className="mt-5 px-6 gap-8 pb-5 lg:max-w-7xl mx-auto">
      <h2 id={headingId} className="text-2xl font-medium px-2 pb-5 capitalize">{title}</h2>
      { loading ? 
        <SkeletonTheme baseColor="rgb(var(--card))" highlightColor="rgb(var(--line))">
        <div role="status" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <span className="sr-only">{t("list.loading")}</span>
          {Array(30)
          .fill(true)
          .map((_, i) => (
            <Skeleton key={i} borderRadius="16px" className={"w-full rounded-2xl h-20"} />
          ))}
        </div>
        </SkeletonTheme>
      : 
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} >
          <Masonry gutter="1rem">
            {cryptos.map((cryptos) => {
              return (
                <CryptoCard
                  key={cryptos.id}
                  cryptoId={cryptos.id}
                  cryptoName={cryptos.name}
                  cryptoValue={cryptos.current_price}
                  cryptoChangeDay={cryptos.price_change_percentage_24h}
                  cryptoImage={cryptos.image}
                  cryptoFavorite={cryptos.favorite}
                  crypto={cryptos}
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      }
      {children}
    </section>
  );
};

export default CryptoList;
