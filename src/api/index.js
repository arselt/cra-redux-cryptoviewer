import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  headers: { 
    "Content-Type": "application/json; charset=utf-8"
  }
})

export const getCrypto = async () => {
  try {
    const { data } = await api.get("/coins/markets", {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 99,
        page: 1,
        sparkline: false
      }
    })
    return data;
  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
    throw error.message;
  }
};

export const getCryptoDetails = async (cryptoItem) => {
  try {
    const { data } = await api.get(`/coins/${cryptoItem}/market_chart?vs_currency=usd&days=30&interval=daily&precision=6`)
    return data;
  } catch (error) {
    console.error('Error fetching crypto detail data:', error.message);
    throw error.message;
  }
};
