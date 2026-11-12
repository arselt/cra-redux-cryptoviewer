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
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:m-2 focus:rounded-md focus:bg-zinc-900 focus:px-3 focus:py-2 focus:text-zinc-100 focus:outline-zinc-200">
        Skip to content
      </a>
      <Header />
      <main id="main">
        {cryptos.filter(crypto => crypto.favorite).length >= 1 ?
          <CryptoList title={"Favorites"} cryptos={cryptos.filter(crypto => crypto.favorite)} /> : null
        }
        <CryptoList title={"Cryptocurrencies by marketcap"} cryptos={cryptos} />
      </main>
    </div>
  );
}

export default App;
