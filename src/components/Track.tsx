import { useEffect, useRef, useState } from "react";
import Step from "./Step";
import { Sequence, Synth, SynthOptions } from "tone";
import { Frequency } from "tone/build/esm/core/type/Units";

const Track = () => {
  const STEPS = 16;
  const initialActiveSteps: Frequency[] = Array.from(
    { length: STEPS },
    () => 0
  );
  const synth = useRef<Synth<SynthOptions> | null>(null);
  const [activeSteps, setActiveSteps] = useState(initialActiveSteps);
  const seqRef = useRef<Sequence | null>(null);
  const stepsRef = useRef<HTMLInputElement[]>([]);
  const lampsRef = useRef<HTMLInputElement[]>([]);

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
    seqRef.current = new Sequence(
      (time, step) => {
        if (stepsRef.current[step]?.checked) {
          synth.current?.triggerAttackRelease(activeSteps[step], 0.1, time);
        }
        lampsRef.current[step].checked = true;
      },
      [stepIds],
      "1m"
    );
    seqRef.current.start(0);

    return () => {
      seqRef.current?.dispose();
    };
  }, [activeSteps]);

  return (
    <div className="track">
      {[...Array(STEPS)].map((_, i) => (
        <Step
          key={i}
          index={i}
          activeSteps={activeSteps}
          setActiveSteps={setActiveSteps}
          seqRef={seqRef}
          stepsRef={stepsRef}
          lampsRef={lampsRef}
        />
      ))}
      <button onClick={clearSequence}>Clear</button>
    </div>
  );
};

export default Track;
