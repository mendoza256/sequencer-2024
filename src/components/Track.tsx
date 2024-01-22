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
  const sequence = useRef<Sequence<Frequency> | null>(null);
  const [activeSteps, setActiveSteps] = useState(initialActiveSteps);

  function updateSequence(sequenceArray: Frequency[]) {
    return new Sequence((time, note) => {
      synth.current?.triggerAttackRelease(note, 0.1, time);
    }, sequenceArray);
  }

  function clearSequence() {
    setActiveSteps(initialActiveSteps);
    sequence.current = updateSequence(activeSteps);
  }

  useEffect(() => {
    synth.current = new Synth().toDestination();
    synth.current.volume.value = -12;

    sequence.current = updateSequence(activeSteps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sequence.current = updateSequence(activeSteps);
    console.log(sequence.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSteps]);

  return (
    <div className="track">
      {[...Array(STEPS)].map((_, i) => (
        <Step
          key={i}
          index={i}
          activeSteps={activeSteps}
          setActiveSteps={setActiveSteps}
        />
      ))}
      <button onClick={clearSequence}>Clear</button>
    </div>
  );
};

export default Track;
