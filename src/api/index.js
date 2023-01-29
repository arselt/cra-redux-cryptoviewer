import axios from "axios";

const API = "https://api.coingecko.com/api/v3/coins/";

export const getCrypto = async () => {
  try {
    const { data } = await axios.get(API);
    return data;
  } catch (error) {
    return console.log(error);
  }
};

export const getCryptoDetails = async (crypto) => {
  try {
    const { data } = await axios.get(`${API}${crypto}/`);
    return data;
  } catch (error) {
    return console.log(error);
  }
};
