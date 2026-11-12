import { useId } from "react";
import { SORT_OPTIONS } from "../utils/cryptos";
import { usePrefs } from "../prefs";
import Select from "./Select";

// Every control shares one height and surface so the row reads as a single toolbar
const CONTROL = "h-11 rounded-xl border border-line bg-card text-ink";

const Toolbar = ({ query, onQueryChange, sortKey, onSortChange, onlyFavorites, onOnlyFavoritesChange, onRefresh, isLoading, updatedAt, shown, total }) => {
  const { t, locale } = usePrefs();
  const searchId = useId();
  return (
    <div className="px-6 pt-5 lg:max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 px-2">
        <div className="relative basis-full sm:basis-72">
          <label htmlFor={searchId} className="sr-only">{t("toolbar.search")}</label>
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle">⌕</span>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("toolbar.searchPlaceholder")}
            className={`${CONTROL} w-full pl-9 pr-3 placeholder:text-subtle`}
          />
        </div>
        <Select
          value={sortKey}
          onChange={onSortChange}
          label={t("toolbar.sortBy")}
          prefix={t("toolbar.sortBy")}
          options={Object.keys(SORT_OPTIONS).map((key) => ({ value: key, label: t(`sort.${key}`) }))}
          buttonClassName={`${CONTROL} px-3`}
        />
        <button
          type="button"
          aria-pressed={onlyFavorites}
          onClick={() => onOnlyFavoritesChange(!onlyFavorites)}
          className={`h-11 rounded-xl border px-4 flex items-center gap-2 ${onlyFavorites ? "border-ink bg-ink text-page" : "border-line bg-card text-ink"}`}
        >
          <span aria-hidden="true">{onlyFavorites ? "★" : "☆"}</span>
          {t("toolbar.favoritesOnly")}
        </button>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          aria-label={isLoading ? t("toolbar.updating") : t("toolbar.refresh")}
          title={isLoading ? t("toolbar.updating") : t("toolbar.refresh")}
          className={`${CONTROL} w-11 text-xl leading-none disabled:opacity-60`}
        >
          <span aria-hidden="true" className={`inline-block ${isLoading ? "animate-spin motion-reduce:animate-none" : ""}`}>↻</span>
        </button>
      </div>
      <p role="status" className="px-2 pt-3 text-sm text-subtle">
        {t("toolbar.count", { shown, total })}
        {updatedAt ? ` · ${t("toolbar.updatedAt", { time: new Date(updatedAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) })}` : ""}
      </p>
    </div>
  );
};

export default Toolbar;
