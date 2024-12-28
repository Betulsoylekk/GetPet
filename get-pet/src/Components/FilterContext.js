import React, { createContext, useState } from "react";

// Create a new context
export const FilterContext = createContext();

// Create a provider component
export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({});

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
