import React, { createContext, useContext, useEffect, useState } from "react";
import { Transport, TimeClass } from "tone";
import * as Tone from "tone";
import { TimeBaseUnit } from "tone/build/esm/core/type/TimeBase";
import { Time } from "tone/build/esm/core/type/Units";
import { convertTransportPositionToStep } from "../utils/transport";

type TransportContextType = {
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  Transport: typeof Transport;
  toggleGlobalTransportState: () => void;
  currentStep: Number | null;
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
  const currentStepRef = useRef(null);
  const [currentStep, setCurrentStep] = useState<number | null>(null);

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

  Transport.scheduleRepeat((time) => {
    Tone.Draw.schedule(() => {
      setCurrentStep(
        convertTransportPositionToStep(Tone.Time(time).toBarsBeatsSixteenths())
      );
    }, time);
  }, "16n");

  Transport.bpm.value = 110;
  Transport.loopEnd = "1m";
  Transport.loop = true;

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
        currentStep,
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
