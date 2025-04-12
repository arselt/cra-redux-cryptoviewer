import { SET_CRYPTOS, SET_CRYPTO_DETAILS, SET_FAVORITE, SET_LOADING } from "../actions/types";

const initialState = {
  cryptos: [],
  cryptoDetails: {},
  loading: false
};

export const cryptosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYPTOS: {
      const newCryptos = action.payload.map((crypto) => {
        const existing = state.cryptos.find(c => c.id === crypto.id);
        return {
          ...crypto,
          favorite: existing?.favorite || false
        };
      });
    
      return { ...state, cryptos: newCryptos };
    }    
    case SET_CRYPTO_DETAILS:
      return {
        ...state,
        cryptoDetails: { ...state.cryptoDetails, [action.cryptoId]: action.payload }
      };
    case SET_FAVORITE: {
      const newCryptosList = state.cryptos.map((crypto) => {
        if (crypto.id === action.payload.cryptoId) {
          return {
            ...crypto,
            favorite: !crypto.favorite // si no existe, !undefined === true
          };
        }
        return crypto;
      });
    
      return { ...state, cryptos: newCryptosList };
    }      
    case SET_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};
