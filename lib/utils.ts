import { LANGUAGES } from './languages';

// Serialize fields to string like `createdAt: Date`
export const serializeResponse = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};

export const getLanguageName = (langCode: string) => {
  const lang = LANGUAGES.find((l) => l.code === langCode);
  return lang ? lang.name : langCode;
};
