import { useEffect, useState } from "react";
import getCrypto from "./api";
import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App() {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchCryptos = async () => {
      const cryptosRes = await getCrypto();
      setCryptos(cryptosRes);
    };

    fetchCryptos();
  }, []);

  return (
    <div className="font-Chivo bg-zinc-100">
      <Header />
      <CryptoList cryptos={cryptos} />
    </div>
  );
}

export default App;
