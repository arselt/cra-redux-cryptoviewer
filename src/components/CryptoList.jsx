import CryptoCard from "./CryptoCard";

import { useSelector } from "react-redux";

import Skeleton from "react-loading-skeleton";
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const CryptoList = ({ cryptos }) => {
  const loading = useSelector((state) => state.cryptos.loading);

  console.log(cryptos);
  return (
    <section className="mt-5 px-6 gap-8 pb-5 lg:max-w-7xl mx-auto">
      { loading ? 
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(30)
          .fill(true)
          .map((_, i) => (
            <Skeleton key={i} borderRadius="16px" className={"w-max rounded-2xl shadow-xl mb-6 h-20"} />
          ))}
        </div>
      : 
        <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}} >
          <Masonry>
            {cryptos.map((cryptos) => {
              return (
                <CryptoCard
                  key={cryptos.id}
                  cryptoId={cryptos.id}
                  cryptoName={cryptos.name}
                  cryptoValue={cryptos.current_price}
                  cryptoTicker="USD"
                  cryptoChangeDay={cryptos.price_change_percentage_24h}
                  cryptoImage={cryptos.image}
                  cryptoFavorite={cryptos.favorite}
                  className="w-max max-w-sm rounded-2xl shadow-xl mb-6 h-20"
                />
              );
            })}
          </Masonry>
        </ResponsiveMasonry>
      }
    </section>
  );
};

export default CryptoList;
