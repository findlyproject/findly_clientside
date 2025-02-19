"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    const scriptId = "google-translate-script";
    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };
  }, []);

  return (
    <div className="">
      <div id="google_translate_element"></div>
    </div>
  );
}
