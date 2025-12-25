// Centralized API URL constants & helpers

// Base pieces (adjust here if version/path changes)
export const API_BASE_URL = 'https://company-documnets.onrender.com';
export const API_BASE_PATH = '/api';
// export const API_VERSION = 'v1';

// Core builder (kept simple to avoid edge cases with the optional chain above)
const build = (...parts: string[]) =>
  API_BASE_URL +
  '/' +
  parts
    .map((p) => p.replace(/^\/+|\/+$/g, ''))
    .filter(Boolean)
    .join('/');

// Grouped endpoint constants / factories
export const API_URLS = {
IT:{
 HARDWARE: build(API_BASE_PATH, 'new-hardware'),
 SOFTWARELICENSE: build(API_BASE_PATH, 'software'),
},
BANKING: {
  TELEX_TRANSFERS: build(API_BASE_PATH, 'telex-transfers'),
  BANK_ACCOUNTS: build(API_BASE_PATH, 'bank-accounts'),
  CHEQUES: build(API_BASE_PATH, 'cheques'),
},
} as const;

// Optional: query helper (useful for services building dynamic query strings)
export const withQuery = (
  base: string,
  params?: Record<string, string | number | boolean | undefined>
): string => {
  if (!params) return base;
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') usp.append(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `${base}?${qs}` : base;
};

export type ApiUrlMap = typeof API_URLS;
