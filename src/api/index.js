import axios from "axios";

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
  headers: { 
    "Content-Type": "application/json; charset=utf-8"
  }
})

export const getCrypto = async (locale = "en") => {
  try {
    const { data } = await api.get("/coins/markets", {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 250,
        locale,
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

export const CHART_RANGES = [7, 30, 90];

export const getCryptoDetails = async (cryptoItem, days = 30) => {
  if (!CHART_RANGES.includes(days)) throw new Error(`Unsupported range: ${days}`);
  try {
    const { data } = await api.get(`/coins/${encodeURIComponent(cryptoItem)}/market_chart`, {
      params: { vs_currency: "usd", days, interval: "daily", precision: 6 }
    });
    return data;
  } catch (error) {
    console.error('Error fetching crypto detail data:', error.message);
    throw error.message;
  }
};
