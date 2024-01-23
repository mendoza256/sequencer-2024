import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useEffect, useRef, useState } from "react";
import Lamps from "../components/Lamps";
import { Destination, Reverb } from "tone";

const Sequencer = () => {
  const lampsRef = useRef<HTMLInputElement[]>([]);
  const initialScale = ["C4", "B3", "A3", "G3", "F3", "E3", "D3", "C3"];
  const [scale, setScale] = useState<string[]>(initialScale);
  // const reverb = useRef<Reverb | null>(null);

  // useEffect(() => {
  //   reverb.current = new Reverb({
  //     decay: 10,
  //     wet: 0.5,
  //   }).toDestination();
  //   Destination.volume.value = -12;
  //   Destination.chain(reverb.current, Destination.volume);
  // }, []);

  return (
    <>
      {scale.map((note) => (
        <Track key={note} note={note} />
      ))}
      <Lamps lampsRef={lampsRef} />
      <TransportSection setScale={setScale} />
    </>
  );
};

export default Sequencer;
