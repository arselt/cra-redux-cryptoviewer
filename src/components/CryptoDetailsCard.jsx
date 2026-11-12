import { CHART_RANGES, getCryptoDetails } from "../api";
import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";
import { formatPercent } from "../utils/format";
import ErrorMessage from "./ErrorMessage";
import { usePrefs } from "../prefs";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DETAILS_TTL_MS = 10 * 60_000; // persisted charts older than this are refetched

const CryptoPriceChart = lazy(() => import("./CryptoPriceChart"));

const SkeletonLoader = () => <Skeleton borderRadius="16px" className="rounded-2xl w-full h-full" />;

const Stat = ({ label, value }) => (
  <div>
    <dt className="text-sm text-subtle">{label}</dt>
    <dd className="font-medium tabular-nums">{value}</dd>
  </div>
);

const CryptoDetailsCard = ({ cryptoId, cryptoName, crypto, detailsId }) => {
  const { t, locale, money, compactMoney, currency } = usePrefs();
  const [days, setDays] = useState(30);
  const [hasError, setHasError] = useState(false);
  const cacheKey = `${cryptoId}:${days}:${currency}`;
  const cryptoDetails = useSelector((state) => state.cryptos.cryptoDetails[cacheKey]);
  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    setHasError(false);
    try {
      dispatch(setCryptoDetails(cacheKey, { ...(await getCryptoDetails(cryptoId, days, currency)), fetchedAt: Date.now() }));
    } catch {
      setHasError(true);
    }
  }, [cacheKey, cryptoId, days, currency, dispatch]);

  useEffect(() => {
    const isFresh = Date.now() - (cryptoDetails?.fetchedAt ?? 0) < DETAILS_TTL_MS;
    if (!isFresh) fetchDetails();
  }, [cryptoDetails, fetchDetails]);

  return (
    <SkeletonTheme baseColor="rgb(var(--page))" highlightColor="rgb(var(--line))">
      <div id={detailsId} role="region" aria-label={t("details.region", { name: cryptoName })} className="w-full p-4 border-t border-line">
        {crypto && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pb-4 sm:grid-cols-3">
            <Stat label={t("details.rank")} value={`#${crypto.market_cap_rank ?? "–"}`} />
            <Stat label={t("details.marketCap")} value={compactMoney(crypto.market_cap)} />
            <Stat label={t("details.volume")} value={compactMoney(crypto.total_volume)} />
            <Stat label={t("details.high")} value={money(crypto.high_24h)} />
            <Stat label={t("details.low")} value={money(crypto.low_24h)} />
            <Stat label={t("details.ath")} value={`${money(crypto.ath)} (${formatPercent(crypto.ath_change_percentage, locale)})`} />
          </dl>
        )}
        <div role="group" aria-label={t("details.range")} className="flex gap-2 pb-3">
          {CHART_RANGES.map((range) => (
            <button
              key={range}
              type="button"
              aria-pressed={range === days}
              onClick={() => setDays(range)}
              className={`rounded-lg px-3 min-h-9 ${range === days ? "bg-ink text-page" : "bg-line text-ink"}`}
            >
              {t("details.days", { days: range })}
            </button>
          ))}
        </div>
        <div className="h-[210px]">
          {hasError ? (
            <ErrorMessage message={t("error.chart")} onRetry={fetchDetails} />
          ) : cryptoDetails ? (
            <Suspense fallback={<SkeletonLoader />}>
              <CryptoPriceChart prices={cryptoDetails.prices} name={cryptoName} />
            </Suspense>
          ) : (
            <SkeletonLoader />
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CryptoDetailsCard;
