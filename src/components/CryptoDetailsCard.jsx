import { getCryptoDetails } from "../api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import IconStar from "./IconStar";

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
      <div className="flex w-full max-w-sm h-52">
        <IconStar isFavorite={false} onClick={() => console.log("click")} />
        <div className="p-4 w-full text-justify break-all">
          {loading ? (
            <Skeleton count={7} />
          ) : (
            `${
              cryptoDetails.description === ""
                ? "Error: No available data"
                : cryptoDetails.description.substring(0, 264)
            }`
          )}
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CryptoDetailsCard;
