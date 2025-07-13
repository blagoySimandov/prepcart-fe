export const CONFIG = {
  EnableSearchHighlighting: "enable_search_highlighting",
  StoreNames: "store_names",
  CatalogSearchDebounceTime: "catalog_search_debounce_time",
  LatestVersion: "latest_version",
  MinVersion: "min_version",
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
  [CONFIG.LatestVersion]: "1.0.0",
  [CONFIG.MinVersion]: "1.0.0",
};
