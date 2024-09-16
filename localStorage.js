let storage = window.localStorage;

const KEY_PREFIX = `github-filters`;

const fullKey = key => `${KEY_PREFIX}.${key}`;

export const getItem = key => storage.getItem(fullKey(key));

export const setItem = (key, item) => storage.setItem(fullKey(key), item);

export const getObject = key => JSON.parse(getItem(key));

export const setObject = (key, object) => setItem(key, JSON.stringify(object));
