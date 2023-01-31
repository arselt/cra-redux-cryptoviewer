import CryptoCard from "./CryptoCard";

const CryptoList = ({ cryptos }) => {
  return (
    <main className="justify-items-center mt-5 px-6 gap-8 pb-5 lg:grid-cols-3 lg:max-w-7xl lg:columns-3">
      {cryptos.map((cryptos) => {
        return (
          <CryptoCard
            key={cryptos.id}
            cryptoId={cryptos.id}
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
