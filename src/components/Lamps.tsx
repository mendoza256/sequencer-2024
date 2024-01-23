import { useEffect, useRef } from "react";
import { Sequence } from "tone";

type LampsProps = {
  lampsRef: React.MutableRefObject<HTMLInputElement[]>;
};

const Lamps = ({ lampsRef }: LampsProps) => {
  const STEPS = 16;
  const seqRef = useRef<Sequence | null>(null);
  const stepIds = [...Array(STEPS).keys()] as const;

  useEffect(() => {
    seqRef.current = new Sequence(
      (time, step) => {
        lampsRef.current[step].checked = true;
      },
      [stepIds],
      "1m"
    );
    seqRef.current.start(0);

    return () => {
      seqRef.current?.dispose();
    };
  }, [stepIds]);

  return (
    <div className="flex items-center justify-between gap-4">
      {stepIds.map((_, i) => (
        <div className="flex flex-col" key={i}>
          <label className="light seq-element relative">
            <input
              type="radio"
              name="lamp"
              id={"lamp" + "-" + i}
              disabled
              ref={(elm) => {
                if (!elm) return;
                lampsRef.current[i] = elm;
              }}
              className="light__inner absolute"
            />
            <div className="light__inner"></div>
          </label>
        </div>
      ))}
    </div>
  );
};

export default Lamps;
