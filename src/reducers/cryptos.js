import { SET_CRYPTOS } from "../actions/types";

const initialState = {
  cryptos: []
};

export const cryptosReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CRYPTOS:
      return { ...state, cryptos: action.payload };
    default:
      return state;
  }
};
