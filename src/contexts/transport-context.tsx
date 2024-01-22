import React, { createContext, useContext, useEffect, useState } from "react";
import { Transport, Draw } from "tone";

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

  useEffect(() => {
    const onStart = () => {
      setIsPlaying(true);
      console.log("started", Transport.state);
    };

    const onStop = () => {
      setIsPlaying(false);
      console.log("stopped", Transport.state);
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

  Transport.bpm.value = 110;
  Transport.loopEnd = "1m";
  Transport.loop = true;

  Transport.schedule((time) => {
    console.log("time", time);
    Draw.schedule(() => {
      // do drawing or DOM manipulation here
      console.log(time);
    }, time);
  }, "+0.5");

  function toggleGlobalTransportState() {
    if (Transport.state !== "started") {
      Transport.start();
    } else {
      Transport.stop();
    }
  }

  return (
    <TransportContext.Provider
      value={{ isPlaying, setIsPlaying, Transport, toggleGlobalTransportState }}
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
