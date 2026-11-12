import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos, setError, setLoading } from "./actions";

import { getCrypto } from "./api";
import { filterCryptos, sortCryptos } from "./utils/cryptos";

import CryptoList from "./components/CryptoList";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";

function App() {
  const cryptos = useSelector((state) => state.cryptos.cryptos);
  const isLoading = useSelector((state) => state.cryptos.loading);
  const error = useSelector((state) => state.cryptos.error);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState("rank");

  const fetchCryptos = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      dispatch(setCryptos(await getCrypto()));
    } catch {
      dispatch(setError("Could not load prices. The service may be busy; try again in a minute."));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  const visible = useMemo(() => sortCryptos(filterCryptos(cryptos, query), sortKey), [cryptos, query, sortKey]);
  const favorites = visible.filter((crypto) => crypto.favorite);
  const updatedAt = cryptos.reduce((latest, crypto) => (crypto.last_updated > latest ? crypto.last_updated : latest), "");
  // Show skeletons only on the very first load; cached data stays visible while refreshing
  const isFirstLoad = isLoading && cryptos.length === 0;

  return (
    <div className="font-Chivo">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:m-2 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-page focus:outline-page">
        Skip to content
      </a>
      <Header />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        sortKey={sortKey}
        onSortChange={setSortKey}
        onRefresh={fetchCryptos}
        isLoading={isLoading}
        updatedAt={updatedAt}
        shown={visible.length}
        total={cryptos.length}
      />
      <main id="main">
        {error && (
          <div className="px-6 pt-5 lg:max-w-7xl mx-auto">
            <ErrorMessage message={error} onRetry={fetchCryptos} className="mx-2" />
          </div>
        )}
        {favorites.length >= 1 && <CryptoList title="Favorites" cryptos={favorites} />}
        {!isFirstLoad && !error && visible.length === 0 ? (
          <p className="px-8 pt-8 text-subtle">No coins match "{query}".</p>
        ) : (
          <CryptoList title="Cryptocurrencies by marketcap" cryptos={visible} isLoading={isFirstLoad} />
        )}
      </main>
    </div>
  );
}

export default App;
