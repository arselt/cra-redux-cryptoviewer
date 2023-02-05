import { SET_CRYPTOS, SET_CRYPTO_DETAILS, SET_LOADING } from "./types";

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

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload
});
