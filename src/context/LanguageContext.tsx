import React, { createContext, useContext, useState, useEffect } from "react";
import es from "@/locales/es.json";
import en from "@/locales/en.json";

type Language = "es" | "en";

const translations = { es, en } as const;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof es) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: React.ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {

  const getInitialLanguage = (): Language => {
    const saved = localStorage.getItem("app-language") as Language | null;
    
    if (saved) {
      return saved;
    }
    
    const browserLang = navigator.language.split("-")[0];
    if (browserLang === "es" || browserLang === "en") {
      return browserLang as Language;
    }
    
    return "es"; 
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app-language", lang);
  };

 type TranslationKey = keyof typeof es;

const t = (key: TranslationKey): string => {
  return translations[language][key] || key;
};

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage debe usarse dentro de <LanguageProvider>");
  }
  return ctx;
}