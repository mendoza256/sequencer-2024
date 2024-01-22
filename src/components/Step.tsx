import { useState } from "react";
import { Frequency } from "tone/build/esm/core/type/Units";
import { Sequence } from "tone";

type StepProps = {
  index: number;
  activeSteps: Frequency[];
  setActiveSteps: React.Dispatch<React.SetStateAction<Frequency[]>>;
  currentStep: number;
  seqRef: React.MutableRefObject<Sequence | null>;
  stepsRef: React.MutableRefObject<HTMLInputElement[]>;
  lampsRef: React.MutableRefObject<HTMLInputElement[]>;
};

const Step = ({
  index,
  activeSteps,
  setActiveSteps,
  seqRef,
  stepsRef,
  lampsRef,
}: StepProps) => {
  const [note, setNote] = useState("C4");
  const isActive = activeSteps[index] !== 0;

  const handleClick = () => {
    setActiveSteps((prev) => {
      const newArr = [...prev];
      if (isActive) {
        newArr[index] = 0;
      } else {
        newArr[index] = note;
      }

      return newArr;
    });
  };

  return (
    <div className="flex flex-col items-center">
      <label className="flex flex-col items-center">
        <input
          key={index}
          id={`step-${index}`}
          type="checkbox"
          ref={(elm) => {
            if (!elm) return;
            if (!stepsRef.current[index]) {
              stepsRef.current[index] = [];
            }
            stepsRef.current[index] = elm;
          }}
          onClick={handleClick}
          className={`step ${isActive ? "active" : ""}`}
        />
        <div className="step__number">{index + 1}</div>
      </label>
      <label className="light flex flex-col items-center justify-center">
        <input
          type="radio"
          name="lamp"
          id={"lamp" + "-" + index}
          disabled
          ref={(elm) => {
            if (!elm) return;
            lampsRef.current[index] = elm;
          }}
          className={`light__inner`}
        />
      </label>
      <label className="flex flex-col items-center">
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="step__note"
          style={{ width: "30px" }}
        />
      </label>
    </div>
  );
};

export default Step;
