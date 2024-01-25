import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useEffect, useRef, useState } from "react";
import Lamps from "../components/Lamps";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Sequencer = () => {
  const lampsRef = useRef<HTMLInputElement[]>([]);
  const initialScale = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
  const [scale, setScale] = useState<null | string[]>(null);
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile) {
      setScale(initialScale.slice(0, 4));
    } else if (isTablet) {
      setScale(initialScale.slice(0, 6));
    } else {
      setScale(initialScale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  return (
    <>
      {scale?.map((note, index) => (
        <Track key={index} note={note} rowIndex={index} />
      ))}
      <Lamps lampsRef={lampsRef} />
      <TransportSection />
    </>
  );
};

export default Sequencer;
