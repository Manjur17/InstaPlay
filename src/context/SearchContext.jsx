import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {

    const [query, setQuery] = useState("");

    const setSerachText = (data) => {
        setQuery(data);
    };

    return (
        <SearchContext.Provider value={{ setSerachText, query }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    return useContext(SearchContext);
};
