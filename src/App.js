import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos } from "./actions";
import getCrypto from "./api";
import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App() {

  const cryptos = useSelector(state => state.cryptos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptos = async () => {
      const cryptosRes = await getCrypto();
      dispatch(setCryptos(cryptosRes));
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
