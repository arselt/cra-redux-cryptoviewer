import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos, setLoading } from "./actions";
import { getCrypto } from "./api";
import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App() {
  const cryptos = useSelector((state) => state.cryptos);
  const dispatch = useDispatch();

  // const loading = useSelector((state) => state.loading);

  useEffect(() => {
    const fetchCryptos = async () => {
      dispatch(setLoading(true));
      const cryptosRes = await getCrypto();
      dispatch(setCryptos(cryptosRes));
      dispatch(setLoading(false));
    };

    fetchCryptos();
    // const intervalId = setInterval(fetchCryptos, 120000);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="font-Chivo bg-zinc-100">
      <Header />
      {/* {loading ? "loading" : <CryptoList cryptos={cryptos} />} */}
      {/* <CryptoList cryptos={cryptos} loading={loading} /> */}
      <CryptoList cryptos={cryptos} />
    </div>
  );
}

export default App;
