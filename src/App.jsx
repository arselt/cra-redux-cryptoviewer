import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptos, setError, setLoading } from "./actions";

import { getCrypto } from "./api";
import { usePersistedState } from "./hooks/usePersistedState";
import { usePrefs } from "./prefs";
import { SORT_OPTIONS, filterCryptos, sortCryptos } from "./utils/cryptos";

import CryptoList from "./components/CryptoList";
import ErrorMessage from "./components/ErrorMessage";
import Header from "./components/Header";
import Toolbar from "./components/Toolbar";

const PAGE_SIZE = 24;

function App() {
  const { t, lang, currency } = usePrefs();
  const cryptos = useSelector((state) => state.cryptos.cryptos);
  const isLoading = useSelector((state) => state.cryptos.loading);
  const hasError = useSelector((state) => Boolean(state.cryptos.error));
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [storedSortKey, setSortKey] = usePersistedState("sort", "rank");
  const sortKey = storedSortKey in SORT_OPTIONS ? storedSortKey : "rank";
  const [onlyFavorites, setOnlyFavorites] = usePersistedState("onlyFavorites", false);
  const [pageCount, setPageCount] = useState(1);

  const fetchCryptos = useCallback(async () => {
    dispatch(setLoading(true));
    dispatch(setError(null));
    try {
      dispatch(setCryptos(await getCrypto(lang, currency)));
    } catch {
      dispatch(setError(true));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, lang, currency]);

  useEffect(() => {
    fetchCryptos();
  }, [fetchCryptos]);

  // Any change to the filters starts again from the first page
  useEffect(() => {
    setPageCount(1);
  }, [query, sortKey, onlyFavorites]);

  const visible = useMemo(() => sortCryptos(filterCryptos(cryptos, query), sortKey), [cryptos, query, sortKey]);
  const favorites = visible.filter((crypto) => crypto.favorite);
  const mainList = onlyFavorites ? favorites : visible;
  const pageItems = mainList.slice(0, pageCount * PAGE_SIZE);
  const remaining = mainList.length - pageItems.length;
  const updatedAt = cryptos.reduce((latest, crypto) => (crypto.last_updated > latest ? crypto.last_updated : latest), "");
  // Show skeletons only on the very first load; cached data stays visible while refreshing
  const isFirstLoad = isLoading && cryptos.length === 0;
  const hasNoFavorites = onlyFavorites && !cryptos.some((crypto) => crypto.favorite);

  return (
    <div className="font-Chivo">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:m-2 focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-page focus:outline-page">
        {t("app.skipToContent")}
      </a>
      <Header />
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        sortKey={sortKey}
        onSortChange={setSortKey}
        onlyFavorites={onlyFavorites}
        onOnlyFavoritesChange={setOnlyFavorites}
        onRefresh={fetchCryptos}
        isLoading={isLoading}
        updatedAt={updatedAt}
        shown={mainList.length}
        total={cryptos.length}
      />
      <main id="main">
        {hasError && (
          <div className="px-6 pt-5 lg:max-w-7xl mx-auto">
            <ErrorMessage message={t("error.prices")} onRetry={fetchCryptos} className="mx-2" />
          </div>
        )}
        {!onlyFavorites && favorites.length >= 1 && <CryptoList title={t("list.favorites")} cryptos={favorites} />}
        {!isFirstLoad && !hasError && mainList.length === 0 ? (
          <p className="px-8 pt-8 text-subtle">{hasNoFavorites ? t("list.noFavorites") : t("list.noResults", { query })}</p>
        ) : (
          <CryptoList title={onlyFavorites ? t("list.favorites") : t("list.all")} cryptos={pageItems} isLoading={isFirstLoad}>
            {remaining > 0 && (
              <div className="flex justify-center pt-4">
                <button type="button" onClick={() => setPageCount((count) => count + 1)} className="rounded-xl bg-ink px-5 py-2 min-h-10 text-page">
                  {t("list.showMore", { remaining })}
                </button>
              </div>
            )}
          </CryptoList>
        )}
      </main>
    </div>
  );
}

export default App;
