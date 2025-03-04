import axios from "axios";

const API = "https://api.coinpaprika.com/v1/";

export const getCrypto = async () => {
  try {
    const { data } = await axios.get(`${API}tickers/`);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const getCryptoDetails = async (crypto) => {
  try {
    const { data } = await axios.get(`${API}coins/${crypto}/`);
    console.log(data)
    return data;
  } catch (error) {
    return console.log(error);
  }
};
