import React, { createContext, useContext, useEffect, useState } from "react";
import { Transport } from "tone";
import * as Tone from "tone";

type TransportContextType = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  Transport: typeof Transport;
  toggleGlobalTransportState: () => void;
};

const TransportContext = createContext<TransportContextType | null>(null);

export default function TransportContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(
    Transport.state === "started"
  );
  Transport.bpm.value = 110;
  Transport.loopEnd = "1m";
  Transport.swing = 0.0;
  Transport.swingSubdivision = "16n";
  Transport.loop = true;

  useEffect(() => {
    const onStart = () => {
      setIsPlaying(true);
    };

    const onStop = () => {
      setIsPlaying(false);
    };

    // Listen for "start" and "stop" events
    Transport.on("start", onStart);
    Transport.on("stop", onStop);

    // Cleanup event listeners when the component unmounts
    return () => {
      Transport.off("start", onStart);
      Transport.off("stop", onStop);
    };
  }, []);

  function toggleGlobalTransportState() {
    if (Transport.state !== "started") {
      Tone.start().then(() => {
        Transport.start();
      });
    } else {
      Transport.stop();
    }
  }

  return (
    <TransportContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        Transport,
        toggleGlobalTransportState,
      }}
    >
      {children}
    </TransportContext.Provider>
  );
}

export function useTransportContext() {
  const context = useContext(TransportContext);
  if (!context) {
    throw new Error(
      "useTransport must be used within a TransportContextProvider"
    );
  }
  return context;
}
