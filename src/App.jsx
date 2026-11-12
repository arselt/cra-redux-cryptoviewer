import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos, setLoading } from "./actions";

import { getCrypto } from "./api";

import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App() {
  const cryptos = useSelector((state) => state.cryptos.cryptos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptos = async () => {
      dispatch(setLoading(true));
      const cryptosRes = await getCrypto();
      dispatch(setCryptos(cryptosRes));
      dispatch(setLoading(false));
    };

    fetchCryptos();
  }, []);

  return (
    <div className="font-Chivo bg-zinc-100">
      <Header />
      <main>
        {cryptos.filter(crypto => crypto.favorite).length >= 1 ?
          <CryptoList title={"Favorites"} cryptos={cryptos.filter(crypto => crypto.favorite)} /> : null
        }
        <CryptoList title={"Cryptocurrencies by marketcap"} cryptos={cryptos} />
      </main>
    </div>
  );
}

export default App;
