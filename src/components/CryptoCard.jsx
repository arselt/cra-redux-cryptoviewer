const CryptoCard = ({ cryptoName, cryptoValue, cryptoTicker, cryptoChangeDay, cryptoImage }) => {
  return (
    <div className="bg-zinc-200 flex items-center justify-between w-full min-w-{280} max-w-sm h-20 px-2 rounded-2xl shadow-xl">
      <div className="flex items-center">
        <img
          src={cryptoImage}
          alt=""
          className="w-8 h-8"
        />
        <h3 className="text-2xl capitalize ml-2">{cryptoName}</h3>
      </div>
      <div className="flex items-end text-end flex-col">
        <span className="text-base uppercase ">{cryptoValue} {cryptoTicker}</span>
        <span className="text-sm uppercase text-emerald-600">{cryptoChangeDay}</span>
      </div>
    </div>
  );
};

export default CryptoCard;
