import CryptoCard from "./CryptoCard";

const CryptoList = ({ cryptos }) => {
    return (
        <main className="min-h-screen grid justify-items-center my-5 px-6 gap-6">
            {cryptos.map((index) => {
                return <CryptoCard key={index} cryptoName="Ethereum" cryptoValue="31,545" cryptoTicker="mxn" cryptoChangeDay="3.76%" cryptoImage="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880"/>
            })};
        </main>
    );
};

CryptoList.defaultProps = {
    cryptos: Array(10).fill(''),
};

export default CryptoList;