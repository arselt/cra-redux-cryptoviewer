import CryptoCard from "./CryptoCard";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const CryptoList = ({ cryptos }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <main className="mt-5 px-6 gap-8 pb-5 sm:columns-2 sm:max-w-3xl lg:max-w-7xl lg:columns-3 mx-auto">
      {loading
        ? Array(30)
            .fill(true)
            .map((_, i) => (
              <div key={i} className="max-w-sm mx-auto">
                <Skeleton borderRadius="16px" className={"w-max rounded-2xl shadow-xl mb-6 h-20"} />
              </div>
            ))
        : cryptos.slice(0, 100).map((cryptos) => {
            // {cryptos.map((cryptos) => {
            return (
              <CryptoCard
              key={cryptos.id}
              cryptoId={cryptos.id}
              cryptoName={cryptos.name}
              cryptoValue={cryptos.quotes.USD.price}
              cryptoTicker="USD"
              cryptoChangeDay={cryptos.quotes.USD.percent_change_24h}
              // cryptoImage={cryptos.image.thumb}
              className="w-max max-w-sm rounded-2xl shadow-xl mb-6 h-20"
              />
            );
          })}
    </main>
  );
};

export default CryptoList;
