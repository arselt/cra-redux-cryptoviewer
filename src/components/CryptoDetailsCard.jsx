import { getCryptoDetails } from "../api";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CryptoPriceChart = lazy(() => import("./CryptoPriceChart"));

const CryptoDetailsCard = ({ cryptoId }) => {
  const cryptoDetails = useSelector((state) => state.cryptos.cryptoDetails[cryptoId]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptos = async () => {
      if (!cryptoDetails) {
        const cryptosDetailRes = await getCryptoDetails(cryptoId);
        dispatch(setCryptoDetails(cryptoId, cryptosDetailRes));
      }
    };
    fetchCryptos();
  }, [cryptoId, cryptoDetails, dispatch]);

  const SkeletonLoader = () => (
    <Skeleton borderRadius="16px" className="rounded-2xl shadow-xl mb-6 w-full h-full" />
  );

  return (
    <SkeletonTheme baseColor="#f4f4f5" highlightColor="#fafafa">
      <div className="flex w-full h-[228px] p-4">
        <div className="w-full h-full">
          {cryptoDetails ? (
            <Suspense fallback={<SkeletonLoader />}>
              <CryptoPriceChart 
                prices={cryptoDetails.prices} 
                graphColor={"#52525b"}
              />
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