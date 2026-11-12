import { useId } from "react";
import { SORT_OPTIONS } from "../utils/cryptos";
import { usePrefs } from "../prefs";
import Select from "./Select";
import { RefreshIcon, SearchIcon, StarFilledIcon, StarOutlineIcon } from "./icons";

// Every control shares one height and surface so the row reads as a single toolbar
const CONTROL = "h-11 rounded-xl border border-line bg-card text-ink";

const Toolbar = ({ query, onQueryChange, sortKey, onSortChange, onlyFavorites, onOnlyFavoritesChange, onRefresh, isLoading, updatedAt, shown, total }) => {
  const { t, locale } = usePrefs();
  const searchId = useId();
  const refreshLabel = isLoading ? t("toolbar.updating") : t("toolbar.refresh");
  const favoritesLabel = t("toolbar.favoritesOnly");
  const updatedTime = updatedAt ? new Date(updatedAt).toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" }) : "";

  return (
    <div className="px-6 pt-5 lg:max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center gap-2 px-2">
        <div className="relative basis-full sm:basis-auto sm:grow lg:grow-0 lg:w-80">
          <label htmlFor={searchId} className="sr-only">{t("toolbar.search")}</label>
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-subtle" />
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t("toolbar.searchPlaceholder")}
            className={`${CONTROL} w-full pl-10 pr-3 placeholder:text-subtle`}
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
          aria-label={favoritesLabel}
          title={favoritesLabel}
          onClick={() => onOnlyFavoritesChange(!onlyFavorites)}
          className={`h-11 min-w-11 rounded-xl border px-3 flex items-center justify-center gap-2 ${onlyFavorites ? "border-ink bg-ink text-page" : "border-line bg-card text-ink"}`}
        >
          {onlyFavorites ? <StarFilledIcon /> : <StarOutlineIcon />}
          <span className="hidden sm:inline">{favoritesLabel}</span>
        </button>
        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          aria-label={refreshLabel}
          title={refreshLabel}
          className={`${CONTROL} w-11 flex items-center justify-center disabled:opacity-60`}
        >
          <RefreshIcon className={isLoading ? "animate-spin motion-reduce:animate-none" : ""} />
        </button>
        <p className="w-full pt-1 text-sm text-subtle lg:ml-auto lg:w-auto lg:pt-0">
          {t("toolbar.count", { shown, total })}
          {updatedTime && ` · ${t("toolbar.updatedAt", { time: updatedTime })}`}
        </p>
      </div>
    </div>
  );
};

export default Toolbar;
