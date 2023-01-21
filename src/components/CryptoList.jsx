import CryptoCard from "./CryptoCard";

const CryptoList = ({ cryptos }) => {
  // console.log(cryptos[0]);
  return (
    <main className="min-h-screen grid justify-items-center mt-5 px-6 gap-6 pb-5">
      {cryptos.map((cryptos) => {
        return (
          <CryptoCard
            key={cryptos.id}
            cryptoName={cryptos.name}
            cryptoValue={cryptos.market_data.current_price.mxn}
            cryptoTicker="mxn"
            cryptoChangeDay={cryptos.market_data.market_cap_change_percentage_24h}
            cryptoImage={cryptos.image.small}
          />
        );
      })}
    </main>
  );
};

// CryptoList.defaultProps = {
//     cryptos: Array(10).fill(''),
// };

export default CryptoList;
