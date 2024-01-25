import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useRef } from "react";
import Lamps from "../components/Lamps";

const Sequencer = () => {
  const lampsRef = useRef<HTMLInputElement[]>([]);
  const initialScale = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];
  // const [scale, setScale] = useState<string[]>(initialScale);
  const scale = initialScale;

  return (
    <>
      {scale.map((note, index) => (
        <Track key={index} note={note} rowIndex={index} />
      ))}
      <Lamps lampsRef={lampsRef} />
      <TransportSection />
    </>
  );
};

export default Sequencer;
