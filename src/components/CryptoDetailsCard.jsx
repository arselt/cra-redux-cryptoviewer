import { getCryptoDetails } from "../api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";

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
    <div className="w-full flex justify-center content-center items-center h-32">
      <p className="px-4">
        {loading ? "Loading" : cryptoDetails.description.en.substring(0, 160)}...
      </p>
    </div>
  );
};

export default CryptoDetailsCard;
