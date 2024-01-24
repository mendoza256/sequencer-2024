import { Destination, Transport, gainToDb } from "tone";
import { useTransportContext } from "../contexts/transport-context";
import { useState } from "react";

type TransportSectionProps = {
  setScale: React.Dispatch<React.SetStateAction<string[]>>;
};

const TransportSection = ({ setScale }: TransportSectionProps) => {
  const { isPlaying, toggleGlobalTransportState } = useTransportContext();
  const [bpmValue, setBpmValue] = useState(Math.floor(Transport.bpm.value));

  const handlePlay = () => {
    toggleGlobalTransportState();
  };

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Transport.bpm.value = Number(e.target.value);
    setBpmValue(Math.floor(Transport.bpm.value));
  };
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Destination.volume.value = gainToDb(Number(e.target.value));
  };

  const handleSwingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    Transport.swing = Number(e.target.value);
  };

  // const setScale = (scale: string[]) => {
  //   setScale(scale);
  // };

  return (
    <div className="transport-section flex justify-between items-center mt-4">
      <button className="play-pause-btn" onClick={handlePlay}>
        {isPlaying ? "Stop" : "Play"}
      </button>
      <label className="flex justify-between items-center">
        <span className="bpm-value mr-2">{bpmValue}</span>
        <input
          type="range"
          min={30}
          max={180}
          step={1}
          onChange={handleBpmChange}
          defaultValue={120}
        />
      </label>
      <label className="flex justify-between items-center">
        <span className="mr-2">Swing</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handleSwingChange}
          defaultValue={0.0}
        />
      </label>
      <label className="flex justify-between items-center">
        <span className="mr-2">Volume</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          onChange={handleVolumeChange}
          defaultValue={1}
        />
      </label>
    </div>
  );
};

export default TransportSection;
