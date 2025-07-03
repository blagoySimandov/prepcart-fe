export const CONFIG = {
  EnableSearchHighlighting: "enable_search_highlighting",
  StoreNames: "store_names",
};

export const DEFAULTS = {
  [CONFIG.EnableSearchHighlighting]: true,
  [CONFIG.StoreNames]: JSON.stringify({
    "bila-bg": "Billa",
    "lidl-bg": "Lidl",
    "kaufland-bg": "Kaufland",
  }),
};
