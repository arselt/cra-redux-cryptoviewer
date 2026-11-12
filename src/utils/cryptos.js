// Pure list helpers: search and sort run on data the markets endpoint already returns
export const SORT_OPTIONS = {
  rank: { compare: (a, b) => (a.market_cap_rank ?? Infinity) - (b.market_cap_rank ?? Infinity) },
  price: { compare: (a, b) => b.current_price - a.current_price },
  change: {
    compare: (a, b) => (b.price_change_percentage_24h ?? 0) - (a.price_change_percentage_24h ?? 0)
  },
  name: { compare: (a, b) => a.name.localeCompare(b.name) }
};

export const filterCryptos = (cryptos, query) => {
  const term = query.trim().toLowerCase();
  if (!term) return cryptos;
  return cryptos.filter((crypto) => crypto.name.toLowerCase().includes(term) || crypto.symbol.toLowerCase().includes(term));
};

export const sortCryptos = (cryptos, sortKey) => [...cryptos].sort((SORT_OPTIONS[sortKey] ?? SORT_OPTIONS.rank).compare);
