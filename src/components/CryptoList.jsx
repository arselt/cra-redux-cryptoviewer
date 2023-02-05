import CryptoCard from "./CryptoCard";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const CryptoList = ({ cryptos }) => {
  const loading = useSelector((state) => state.loading);

  return (
    <main className="justify-items-center mt-5 px-6 gap-8 pb-5 sm:columns-2 lg:max-w-7xl lg:columns-3">
      {loading
        ? Array(30)
            .fill(true)
            .map((_, i) => (
              <Skeleton
                width={384}
                height={80}
                key={i}
                className={"w-full max-w-sm rounded-2xl shadow-xl mb-6"}
              />
            ))
        : cryptos.map((cryptos) => {
            // {cryptos.map((cryptos) => {
            return (
              <CryptoCard
                key={cryptos.id}
                cryptoId={cryptos.id}
                cryptoName={cryptos.name}
                cryptoValue={cryptos.market_data.current_price.mxn}
                cryptoTicker="mxn"
                cryptoChangeDay={cryptos.market_data.price_change_percentage_24h_in_currency.mxn}
                cryptoImage={cryptos.image.thumb}
                className="w-full max-w-sm rounded-2xl shadow-xl mb-6"
              />
            );
          })}
    </main>
  );
};

export default CryptoList;
