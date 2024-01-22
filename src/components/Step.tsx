import { useEffect, useState } from "react";
import { Frequency } from "tone/build/esm/core/type/Units";
import { useTransportContext } from "../contexts/transport-context";

type StepProps = {
  index: number;
  activeSteps: Frequency[];
  setActiveSteps: React.Dispatch<React.SetStateAction<Frequency[]>>;
  currentStep: number;
};

const Step = ({ index, activeSteps, setActiveSteps }: StepProps) => {
  const { isPlaying, currentStep } = useTransportContext();
  const [note, setNote] = useState("C4");
  const [isCurrentStep, setIsCurrentStep] = useState(currentStep === index);
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

  useEffect(() => {
    setIsCurrentStep(isPlaying && currentStep === index);
  }, [currentStep, index]);

  return (
    <div className="flex flex-col items-center">
      <div
        key={index}
        className={`step ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        <div className="step__number">{index + 1}</div>
      </div>
      <div className="light flex flex-col items-center justify-center">
        <div className={`light__inner ${isCurrentStep ? "active" : ""}`}></div>
      </div>
    </div>
  );
};

export default Step;
