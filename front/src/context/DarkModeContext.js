import React, { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useLocalStorageState } from "../Hooks/useLocalStorageState";
import { useEffect } from "react";

const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
	const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "isDarkMode");

	useEffect(() => {
		if (isDarkMode) {
			document.documentElement.classList.add("dark-mode");
			document.documentElement.classList.remove("light-mode");
		} else {
			document.documentElement.classList.add("light-mode");
			document.documentElement.classList.remove("dark-mode");
		}
	}, [isDarkMode]);
	const toggleDarkMode = () => {
		setIsDarkMode((isDark) => !isDarkMode);
	};
	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

const useDarkMode = () => {
	const context = useContext(DarkModeContext);
	if (context === undefined)
		throw new Error("DarkModeContext was used outside of DarkModeProvider");
	return context;
};

export { DarkModeProvider, useDarkMode };
