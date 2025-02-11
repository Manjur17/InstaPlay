export const getLanguageName = (code) => {
    const languageMap = {
        en: "English",
        es: "Spanish",
        fr: "French",
        de: "German",
        it: "Italian",
        pt: "Portuguese",
        ja: "Japanese",
        ko: "Korean",
        zh: "Chinese",
        ru: "Russian",
        hi: "Hindi",
    };

    return languageMap[code] || "Unknown";
};
