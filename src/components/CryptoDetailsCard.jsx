import { getCryptoDetails } from "../api";
import { useEffect } from "react";

const CryptoDetailsCard = ({cryptoId}) => {

    useEffect(() => {
      const fetchCryptos = async () => {
        const cryptosDetailRes = await getCryptoDetails(cryptoId);

        return await cryptosDetailRes;
      };

      fetchCryptos();
    }, [])
    
    return (
        <div className="w-full flex justify-center content-center items-center h-32">
            Hola
        </div>
    )
}

export default CryptoDetailsCard;