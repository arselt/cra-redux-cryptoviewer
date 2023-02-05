import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos, setLoading } from "./actions";
import { getCrypto } from "./api";
import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App() {
  const cryptos = useSelector((state) => state.cryptos);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptos = async () => {
      dispatch(setLoading(true));
      const cryptosRes = await getCrypto();
      dispatch(setCryptos(cryptosRes));
      dispatch(setLoading(false))
    };

    fetchCryptos();
    const intervalId = setInterval(fetchCryptos, 120000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="font-Chivo bg-zinc-100 grid place-content-center">
      <Header />
      {loading ? "loading" : <CryptoList cryptos={cryptos} />}
    </div>
  );
}

export default App;
