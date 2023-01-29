import { SET_CRYPTOS, SET_CRYPTO_DETAILS } from "../actions/types";

const initialState = {
  cryptos: [],
  cryptoDetails: {}
};

export const cryptosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYPTOS:
      return { ...state, cryptos: action.payload };
    case SET_CRYPTO_DETAILS:
      return {
        ...state,
        cryptoDetails: { ...state.cryptoDetails, [action.cryptoId]: action.payload }
      };
    default:
      return state;
  }
};
