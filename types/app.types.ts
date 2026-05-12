export const Languages = { en: "en", de: "de" } as const;
export type Language = keyof typeof Languages;
export const languages: Array<Language> = Object.values(Languages);
