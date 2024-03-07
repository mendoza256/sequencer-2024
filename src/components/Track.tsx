import { useEffect, useRef, useState } from "react";
import Step from "./Step";
import { Reverb, Sequence, Synth, SynthOptions } from "tone";
import { Frequency } from "tone/build/esm/core/type/Units";
import { useSessionStorage } from "../hooks/useSessionStorage";
import RemoveIcon from "@mui/icons-material/Remove";
import { FrequencyOrNull } from "../utils/baseTypes";
import { useTheme } from "@mui/material/styles";

type TrackProps = {
  note: FrequencyOrNull;
  rowIndex: number;
};

const Track = ({ note, rowIndex }: TrackProps) => {
  const STEPS = 16;
  const initialActiveSteps: FrequencyOrNull[] = Array.from(
    { length: STEPS },
    () => null
  );
  const [storedValue, setStoredValue] = useSessionStorage(
    `seq-${rowIndex}`,
    []
  );
  const [activeSteps, setActiveSteps] = useState(
    storedValue || initialActiveSteps
  );
  const synth = useRef<Synth<SynthOptions> | null>(null);
  const reverb = useRef<Reverb | null>(null);
  const seqRef = useRef<Sequence | null>(null);
  const stepsRef = useRef<HTMLInputElement[]>([]);
  const stepIds = [...Array(STEPS).keys()];
  const theme = useTheme();

  console.log("theme", theme.palette.secondary.contrastText);

  function clearRow() {
    setActiveSteps((prev: FrequencyOrNull[]) => {
      const newArr = [...prev];
      newArr.fill(null);

      setStoredValue(newArr);

      return newArr as Frequency[];
    });
    stepsRef.current.forEach((step) => {
      step.checked = false;
    });
  }

  useEffect(() => {
    synth.current = new Synth().toDestination();
    reverb.current = new Reverb(9).toDestination();
    synth.current.connect(reverb.current);

    reverb.current.generate();

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
  }, [seqRef.current, activeSteps]);

  const handleClick = (index: number, isActive: boolean) => {
    setActiveSteps((prev: FrequencyOrNull[]) => {
      const newArr = [...prev];
      if (isActive) {
        newArr[index] = 0;
      } else {
        newArr[index] = note;
      }

      setStoredValue(newArr);
      return newArr as FrequencyOrNull[];
    });
  };

  return (
    <div className="track relative">
      {[...Array(STEPS)].map((_, i) => (
        <Step
          key={i}
          index={i}
          activeSteps={activeSteps}
          stepsRef={stepsRef}
          handleClick={handleClick}
        />
      ))}
      <div
        role="button"
        tabIndex={0}
        className="flex flex-col items-center relative seq-element clear-button"
        onClick={clearRow}
        // FIXME theme colors are not from context
        style={{ borderColor: theme.palette.secondary.contrastText }}
      >
        <RemoveIcon />
        <div className={`clear-icon-overlay absolute seq-element `}></div>
      </div>
    </div>
  );
};

export default Track;
