import { SET_CRYPTOS, SET_CRYPTO_DETAILS } from "../actions/types";

const initialState = {
  cryptos: []
};

export const cryptosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYPTOS:
      return { ...state, cryptos: action.payload };
    case SET_CRYPTO_DETAILS:
      return { ...state, cryptoDetails: action.payload };
    default:
      return state;
  }
};
