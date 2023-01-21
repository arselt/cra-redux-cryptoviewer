import axios from "axios";

const getCrypto = async () => {
  // return axios.get('https://api.coingecko.com/api/v3/coins/')
  // .then(res => res.data)
  // .then(err => console.log(err))
  const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/");
  return data;
};

export default getCrypto;
