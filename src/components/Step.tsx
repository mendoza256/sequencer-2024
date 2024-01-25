import { Frequency } from "tone/build/esm/core/type/Units";

type StepProps = {
  index: number;
  activeSteps: Frequency[];
  stepsRef: React.MutableRefObject<HTMLInputElement[]>;
  handleClick: (index: number, isActive: boolean) => void;
};

const Step = ({ index, activeSteps, stepsRef, handleClick }: StepProps) => {
  const isActive = !!activeSteps[index];
  function checkIf0rDivisibleBy4(num: number) {
    return num === 0 || num % 4 === 0;
  }

  return (
    <div className="flex flex-col items-center relative">
      <label className="flex flex-col items-center">
        <input
          key={index}
          id={`step-${index}`}
          type="checkbox"
          ref={(elm) => {
            if (!elm) return;
            if (!stepsRef.current[index]) {
              stepsRef.current[index] = [] as unknown as HTMLInputElement;
            }
            stepsRef.current[index] = elm;
          }}
          onClick={() => handleClick(index, isActive)}
          className={`step seq-element absolute`}
          checked={isActive}
        />
        <div
          className={`step seq-element ${isActive ? "active" : ""} ${
            checkIf0rDivisibleBy4(index) ? "downbeat" : ""
          }`}
        ></div>
      </label>
    </div>
  );
};

export default Step;
