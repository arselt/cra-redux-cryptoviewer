import { useId } from "react";
import { SORT_OPTIONS } from "../utils/cryptos";
import { usePrefs } from "../prefs";

const CONTROL = "rounded-xl placeholder:text-subtle border border-line bg-card px-3 py-2 text-ink min-h-10";

const Toolbar = ({ query, onQueryChange, sortKey, onSortChange, onlyFavorites, onOnlyFavoritesChange, onRefresh, isLoading, updatedAt, shown, total }) => {
  const { t, locale } = usePrefs();
  const searchId = useId();
  const sortId = useId();
  return (
    <div className="px-6 pt-5 lg:max-w-7xl mx-auto">
      <div className="flex flex-wrap items-end gap-3 px-2">
        <div className="flex flex-col grow sm:grow-0 sm:w-72">
          <label htmlFor={searchId} className="text-sm text-subtle mb-1">{t("toolbar.search")}</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("toolbar.searchPlaceholder")}
            className={CONTROL}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={sortId} className="text-sm text-subtle mb-1">{t("toolbar.sortBy")}</label>
          <select id={sortId} value={sortKey} onChange={(e) => onSortChange(e.target.value)} className={CONTROL}>
            {Object.keys(SORT_OPTIONS).map((key) => (
              <option key={key} value={key}>{t(`sort.${key}`)}</option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="rounded-xl bg-ink px-4 py-2 min-h-10 text-page disabled:opacity-60"
        >
          {isLoading ? t("toolbar.updating") : t("toolbar.refresh")}
        </button>
        <label className="flex items-center gap-2 min-h-10">
          <input type="checkbox" checked={onlyFavorites} onChange={(e) => onOnlyFavoritesChange(e.target.checked)} className="h-5 w-5 accent-[rgb(var(--ink))]" />
          {t("toolbar.favoritesOnly")}
        </label>
        <p role="status" className="text-sm text-subtle pb-2 ml-auto">
          {t("toolbar.count", { shown, total })}
          {updatedAt ? ` · ${t("toolbar.updatedAt", { time: new Date(updatedAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) })}` : ""}
        </p>
      </div>
    </div>
  );
};

export default Toolbar;
