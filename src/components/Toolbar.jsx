import { useId } from "react";
import { SORT_OPTIONS } from "../utils/cryptos";

const CONTROL = "rounded-xl bg-zinc-200 px-3 py-2 text-zinc-900 min-h-10";

const Toolbar = ({ query, onQueryChange, sortKey, onSortChange, onRefresh, isLoading, updatedAt, shown, total }) => {
  const searchId = useId();
  const sortId = useId();
  return (
    <div className="px-6 pt-5 lg:max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end gap-3 px-2">
        <div className="flex flex-col grow sm:grow-0 sm:w-72">
          <label htmlFor={searchId} className="text-sm text-zinc-700 mb-1">Search</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Name or symbol"
            className={CONTROL}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={sortId} className="text-sm text-zinc-700 mb-1">Sort by</label>
          <select id={sortId} value={sortKey} onChange={(e) => onSortChange(e.target.value)} className={CONTROL}>
            {Object.entries(SORT_OPTIONS).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-xl bg-zinc-900 px-4 py-2 min-h-10 text-zinc-100 focus-visible:outline-zinc-900 disabled:opacity-60"
        >
          {isLoading ? "Updating…" : "Refresh"}
        </button>
        <p role="status" className="text-sm text-zinc-700 pb-2 ml-auto">
          {shown} of {total} coins
          {updatedAt ? ` · updated ${new Date(updatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}` : ""}
        </p>
      </div>
    </div>
  );
};

export default Toolbar;
