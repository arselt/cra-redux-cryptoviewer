import { getCryptoDetails } from "../api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IconStar from "./IconStar";

import CryptoPriceChart from "./CryptoPriceChart";

const CryptoDetailsCard = ({ cryptoId }) => {
  const cryptoDetails = useSelector((state) => state.cryptoDetails[cryptoId]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      const cryptosDetailRes = await getCryptoDetails(cryptoId);
      dispatch(setCryptoDetails(cryptoId, cryptosDetailRes));
      setLoading(false);
    };
    fetchCryptos();
  }, [cryptoId]);

  return (
    <SkeletonTheme baseColor="#f4f4f5" highlightColor="#fafafa">
      <div className="flex w-full h-[228px] p-4">
        <div className="w-full h-full">
          {
            loading ? 
            <Skeleton borderRadius="16px" className={"rounded-2xl shadow-xl mb-6 w-full h-full"}/> : 
            <CryptoPriceChart 
              prices={cryptoDetails.prices} 
              graphColor={"#52525b"}
            />
          }
          <IconStar isFavorite={false} onClick={() => console.log("click")} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CryptoDetailsCard;
