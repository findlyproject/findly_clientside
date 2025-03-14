"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import translate from "google-translate-api-browser";

// Define the context type
interface TranslationContextType {
  language: string;
  setLanguage: (lang: string) => void;
  translateText: (text: string, targetLang: string) => Promise<string>;
}

// Create the context
const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Provider Component
export const TranslationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("en");

  // Translation function
  const translateText = async (text: string, targetLang: string): Promise<string> => {
    try {
      const response = await translate(text, { to: targetLang });
      return response.text;
    } catch (error) {
      console.error("Translation Error:", error);
      return text; // Return original text if API fails
    }
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, translateText }}>
      {children}
    </TranslationContext.Provider>
  );
};

// Custom hook to use translation context
export const useTranslation = (): TranslationContextType => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
