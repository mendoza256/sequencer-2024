import { useEffect, useRef, useState } from "react";
import Step from "./Step";
import { Sequence, Synth, SynthOptions } from "tone";
import { Frequency } from "tone/build/esm/core/type/Units";
import { useSessionStorage } from "../hooks/useSessionStorage";

type TrackProps = {
  note: Frequency;
  rowIndex: number;
};

const Track = ({ note, rowIndex }: TrackProps) => {
  const STEPS = 16;
  const initialActiveSteps: Frequency[] = Array.from(
    { length: STEPS },
    () => 0
  );
  const [activeSteps, setActiveSteps] = useState(initialActiveSteps);
  const [storedValue, setStoredValue] = useSessionStorage("sequence", []);
  const synth = useRef<Synth<SynthOptions> | null>(null);
  const seqRef = useRef<Sequence | null>(null);
  const stepsRef = useRef<HTMLInputElement[]>(storedValue || []);
  const stepIds = [...Array(STEPS).keys()];

  function clearRow() {
    setActiveSteps((prev) => {
      const newArr = [...prev];
      newArr.fill(0);
      return newArr as Frequency[];
    });
  }

  useEffect(() => {
    synth.current = new Synth().toDestination();
    console.log("storedValue", storedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    seqRef.current = new Sequence(
      (time, step) => {
        if (stepsRef.current[step]?.checked) {
          synth.current?.triggerAttackRelease(activeSteps[step], 0.1, time);
        }
      },
      [stepIds],
      "1m"
    );
    seqRef.current.start(0);

    return () => {
      seqRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSteps]);

  const handleClick = (index: number, isActive: boolean) => {
    setActiveSteps((prev) => {
      const newArr = [...prev];
      if (isActive) {
        newArr[index] = 0;
      } else {
        newArr[index] = note;
      }

      return newArr as Frequency[];
    });
  };

  return (
    <div className="track">
      {[...Array(STEPS)].map((_, i) => (
        <Step
          key={i}
          index={i}
          activeSteps={activeSteps}
          stepsRef={stepsRef}
          handleClick={handleClick}
        />
      ))}
      <button onClick={clearRow}>Clear</button>
    </div>
  );
};

export default Track;
