import { useEffect } from "react";
import { connect } from "react-redux";
import { setCryptos as setCryptosActions } from "./actions";
import getCrypto from "./api";
import CryptoList from "./components/CryptoList";
import Header from "./components/Header";

function App({ cryptos, setCryptos }) {
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

const mapStateToProps = (state) => ({
  cryptos: state.cryptos
});

const mapDispatchToProps = (dispatch) => ({
  setCryptos: (value) => dispatch(setCryptosActions(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
