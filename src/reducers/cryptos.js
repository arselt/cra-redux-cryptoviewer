import { SET_CRYPTOS, SET_CRYPTO_DETAILS, SET_LOADING } from "../actions/types";

const initialState = {
  cryptos: [],
  cryptoDetails: {},
  loading: false
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
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
