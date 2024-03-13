import { createContext, useContext } from "react";

export const ColorModeContext = createContext({});

export const ColorModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ColorModeContext.Provider value={{}}>{children}</ColorModeContext.Provider>
  );
};

export function useThemeContext() {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      "useTransport must be used within a TransportContextProvider"
    );
  }
  return context;
}
