export const CONFIG = {
  EnableSearchHighlighting: "enable_search_highlighting",
  StoreNames: "store_names",
  CatalogSearchDebounceTime: "catalog_search_debounce_time",
  LatestVersion: "latest_version",
  MinVersion: "min_version",
  DiscountsAllowedCountries: "discounts_allowed_countries",
  CatalogSearchAllowedCountries: "catalog_search_allowed_countries",
  CatalogSearchRestrictionMode: "catalog_search_restriction_mode",
};

export const DEFAULTS = {
  [CONFIG.EnableSearchHighlighting]: true,
  [CONFIG.StoreNames]: JSON.stringify({
    "bila-bg": "Billa",
    "lidl-bg": "Lidl",
    "kaufland-bg": "Kaufland",
    "cba-bg": "CBA",
    "fantastico-bg": "Fantastico",
    "tmarket-bg": "T-Market",
  }),
  [CONFIG.CatalogSearchDebounceTime]: 100,
  [CONFIG.LatestVersion]: "1.0.1",
  [CONFIG.MinVersion]: "1.0.1",
  [CONFIG.DiscountsAllowedCountries]: JSON.stringify(["BG"]),
  [CONFIG.CatalogSearchAllowedCountries]: JSON.stringify(["BG"]),
  [CONFIG.CatalogSearchRestrictionMode]: "hide_tab",
};
