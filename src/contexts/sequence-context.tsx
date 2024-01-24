import React, { createContext, useContext, useEffect, useState } from "react";

type SequenceContextType = {
  sequenceStore: string[][];
  setSequenceStore: React.Dispatch<React.SetStateAction<string[][]>>;
};

const SequenceContext = createContext<SequenceContextType | null>(null);

export default function SequenceContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sequenceStore, setSequenceStore] = useState<string[][]>([]);

  return (
    <SequenceContext.Provider
      value={{
        sequenceStore,
        setSequenceStore,
      }}
    >
      {children}
    </SequenceContext.Provider>
  );
}

export function useSequenceContext() {
  const context = useContext(SequenceContext);
  if (!context) {
    throw new Error(
      "useSequenceContext must be used within a SequenceContextProvider"
    );
  }
  return context;
}
