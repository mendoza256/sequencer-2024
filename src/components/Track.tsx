import { useEffect, useRef, useState } from "react";
import Step from "./Step";
import { Sequence, Synth, SynthOptions } from "tone";
import { Frequency } from "tone/build/esm/core/type/Units";

type TrackProps = {
  note: Frequency;
};

const Track = ({ note }: TrackProps) => {
  const STEPS = 16;
  const initialActiveSteps: Frequency[] = Array.from(
    { length: STEPS },
    () => 0
  );
  const synth = useRef<Synth<SynthOptions> | null>(null);
  const [activeSteps, setActiveSteps] = useState(initialActiveSteps);
  const stepsRefString = sessionStorage.getItem("stepsRef");
  const stepsRefArray = JSON.parse(stepsRefString);
  const seqRef = useRef<Sequence | null>(null);
  const stepsRef = useRef<HTMLInputElement[]>(stepsRefArray || []);

  const stepIds = [...Array(STEPS).keys()] as const;

  function clearSequence() {
    setActiveSteps(initialActiveSteps);
  }

  useEffect(() => {
    synth.current = new Synth().toDestination();
    synth.current.volume.value = -12;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Extract values from the array
    const inputValues = stepsRef.current.map((inputRef) => inputRef.value);

    // Convert the array of values to a JSON string
    const inputValuesString = JSON.stringify(inputValues);

    // Store the JSON string in sessionStorage
    sessionStorage.setItem("stepsRef", inputValuesString);
  }, [stepsRef.current]);

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
      {/* <button onClick={clearSequence}>Clear</button> */}
    </div>
  );
};

export default Track;
