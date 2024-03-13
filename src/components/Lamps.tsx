import { useTheme } from "@mui/material/styles";
import { useEffect, useRef, useMemo } from "react";
import { Sequence } from "tone";

const Lamps = () => {
  const STEPS = 16 as const;
  const seqRef = useRef<Sequence | null>(null);
  const stepIds = useMemo(() => [...Array(STEPS).keys()], [STEPS]);
  const lampsRef = useRef<HTMLInputElement[]>([]);
  const theme = useTheme();

  useEffect(() => {
    seqRef.current = new Sequence(
      (_time, step) => {
        lampsRef.current[step].checked = true;
      },
      [stepIds],
      "1m"
    );
    seqRef.current.start(0);

    return () => {
      seqRef.current?.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIds]);

  return (
    <div className="flex items-center justify-between gap-4 mr-12">
      {stepIds.map((_, i) => (
        <div className="flex flex-col" key={i}>
          <label
            className={`light seq-element relative ${
              theme.palette.mode === "light" ? "light" : "dark"
            }`}
          >
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
