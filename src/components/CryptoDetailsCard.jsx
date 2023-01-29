import { getCryptoDetails } from "../api";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCryptoDetails } from "../actions";

const CryptoDetailsCard = ({cryptoId}) => {
  const cryptoDetails = useSelector(state => state.cryptoDetails)
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      const cryptosDetailRes = await getCryptoDetails(cryptoId);
      dispatch(setCryptoDetails(cryptosDetailRes));
      setLoading(false);
    };
    fetchCryptos();
  }, [])

  return (
    <div className="w-full flex justify-center content-center items-center h-32">
      <p className="px-4">
        {loading ? 'Loading...' : cryptoDetails.last_updated}
      </p>
    </div>
  )
}

export default CryptoDetailsCard;