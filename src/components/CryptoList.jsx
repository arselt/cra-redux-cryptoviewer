import CryptoCard from "./CryptoCard";

const CryptoList = ({ cryptos }) => {
  return (
    <main className="min-h-screen grid justify-items-center mt-5 px-6 gap-6 pb-5">
      {cryptos.map((cryptos) => {
        return (
          <CryptoCard
            key={cryptos.id}
            cryptoName={cryptos.name}
            cryptoValue={cryptos.market_data.current_price.mxn}
            cryptoTicker="mxn"
            cryptoChangeDay={cryptos.market_data.price_change_percentage_24h_in_currency.mxn}
            cryptoImage={cryptos.image.small}
          />
        );
      })}
    </main>
  );
};

export default CryptoList;
