import { CHART_RANGES, getCryptoDetails } from "../api";
import { useCallback, useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";
import { formatCompactUsd, formatPercent, formatUsd } from "../utils/format";
import ErrorMessage from "./ErrorMessage";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CryptoPriceChart = lazy(() => import("./CryptoPriceChart"));

const SkeletonLoader = () => <Skeleton borderRadius="16px" className="rounded-2xl w-full h-full" />;

const Stat = ({ label, value }) => (
  <div>
    <dt className="text-sm text-subtle">{label}</dt>
    <dd className="font-medium tabular-nums">{value}</dd>
  </div>
);

const CryptoDetailsCard = ({ cryptoId, cryptoName, crypto }) => {
  const [days, setDays] = useState(30);
  const [hasError, setHasError] = useState(false);
  const cacheKey = `${cryptoId}:${days}`;
  const cryptoDetails = useSelector((state) => state.cryptos.cryptoDetails[cacheKey]);
  const dispatch = useDispatch();

  const fetchDetails = useCallback(async () => {
    setHasError(false);
    try {
      dispatch(setCryptoDetails(cacheKey, await getCryptoDetails(cryptoId, days)));
    } catch {
      setHasError(true);
    }
  }, [cacheKey, cryptoId, days, dispatch]);

  useEffect(() => {
    if (!cryptoDetails) fetchDetails();
  }, [cryptoDetails, fetchDetails]);

  return (
    <SkeletonTheme baseColor="rgb(var(--page))" highlightColor="rgb(var(--line))">
      <div id={`details-${cryptoId}`} role="region" aria-label={`${cryptoName} details`} className="w-full p-4 border-t border-line">
        {crypto && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 pb-4 sm:grid-cols-3">
            <Stat label="Rank" value={`#${crypto.market_cap_rank ?? "–"}`} />
            <Stat label="Market cap" value={formatCompactUsd(crypto.market_cap)} />
            <Stat label="24h volume" value={formatCompactUsd(crypto.total_volume)} />
            <Stat label="24h high" value={formatUsd(crypto.high_24h)} />
            <Stat label="24h low" value={formatUsd(crypto.low_24h)} />
            <Stat label="All-time high" value={`${formatUsd(crypto.ath)} (${formatPercent(crypto.ath_change_percentage)})`} />
          </dl>
        )}
        <div role="group" aria-label="Chart range" className="flex gap-2 pb-3">
          {CHART_RANGES.map((range) => (
            <button
              key={range}
              type="button"
              aria-pressed={range === days}
              onClick={() => setDays(range)}
              className={`rounded-lg px-3 min-h-9 ${range === days ? "bg-ink text-page" : "bg-line text-ink"}`}
            >
              {range}D
            </button>
          ))}
        </div>
        <div className="h-[210px]">
          {hasError ? (
            <ErrorMessage message="Could not load the chart." onRetry={fetchDetails} />
          ) : cryptoDetails ? (
            <Suspense fallback={<SkeletonLoader />}>
              <CryptoPriceChart prices={cryptoDetails.prices} graphColor={"#52525b"} name={cryptoName} />
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
