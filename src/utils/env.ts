export const FIREBASE_AUTHDOMAIN = import.meta.env
  .VITE_FIREBASE_AUTHDOMAIN as string;
export const FIREBASE_APIKEY = import.meta.env.VITE_FIREBASE_APIKEY as string;

export const FIREBASE_DATABASEURL = import.meta.env
  .VITE_FIREBASE_DATABASEURL as string;

export const FIREBASE_PROJECTID = import.meta.env
  .VITE_FIREBASE_PROJECTID as string;
export const FIREBASE_STORAGEBUCKET = import.meta.env
  .VITE_FIREBASE_STORAGEBUCKET as string;
export const FIREBASE_MESSAGEINGSENDERID = import.meta.env
  .VITE_FIREBASE_MESSAGEINGSENDERID as string;
export const FIREBASE_AppID = import.meta.env.VITE_FIREBASE_AppID as string;

export const isProduction = import.meta.env.PROD;
export const isDevelopment = !import.meta.env.PROD;
