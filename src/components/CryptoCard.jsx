const CryptoCard = () => {
  return (
    <div className="bg-zinc-200 flex items-center justify-between w-full min-w-{280} max-w-sm h-20 px-2 rounded-2xl shadow-xl">
      <div className="flex items-center">
        <img
          src="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"
          alt=""
          className="w-8 h-8"
        />
        <h2 className="text-2xl capitalize ml-2">ethereum</h2>
      </div>
      <div className="flex items-end text-end flex-col">
        <span className="text-base uppercase ">29,388 mxn</span>
        <span className="text-sm uppercase text-emerald-600">+ 3.79%</span>
      </div>
    </div>
  );
};

export default CryptoCard;
