import { Transport } from "tone";
import { convertTransportPositionToStep } from "../utils/transport";
import { useState } from "react";
import { Frequency } from "tone/build/esm/core/type/Units";

type StepProps = {
  index: number;
  activeSteps: Frequency[];
  setActiveSteps: React.Dispatch<React.SetStateAction<Frequency[]>>;
};

const Step = ({ index, activeSteps, setActiveSteps }: StepProps) => {
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

  const isCurrentStep =
    convertTransportPositionToStep(Transport.position) === index;

  return (
    <div className="flex flex-col items-center">
      <div
        key={index}
        className={`step ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        <div className="step__number">{index + 1}</div>
      </div>
      {/* <label>
        Note
        <select
          name="note"
          defaultValue={note}
          onChange={(e) => setNote(e.target.value)}
        >
          <option value="C4">C4</option>
          <option value="D4">D4</option>
          <option value="E4">E4</option>
          <option value="F4">F4</option>
        </select>
      </label> */}
      <div className="light flex flex-col items-center justify-center">
        <div className={`light__inner ${isCurrentStep ? "active" : ""}`}></div>
      </div>
    </div>
  );
};

export default Step;
