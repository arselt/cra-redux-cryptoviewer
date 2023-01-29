import { SET_CRYPTOS, SET_CRYPTO_DETAILS } from "./types";

export const setCryptos = (payload) => ({
  type: SET_CRYPTOS,
  payload
});

export const setCryptoDetails = (cryptoId, details) => {
  return {
    type: SET_CRYPTO_DETAILS,
    cryptoId,
    payload: details
  };
};
