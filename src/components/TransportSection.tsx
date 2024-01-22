import { useTransportContext } from "../contexts/transport-context";

const TransportSection = () => {
  const { isPlaying, toggleGlobalTransportState } = useTransportContext();

  const handlePlay = () => {
    toggleGlobalTransportState();
  };

  return (
    <>
      <button className="play-pause-btn" onClick={handlePlay}>
        {isPlaying ? "Stop" : "Play"}
      </button>
    </>
  );
};

export default TransportSection;
