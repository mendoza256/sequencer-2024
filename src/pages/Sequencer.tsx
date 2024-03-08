import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useEffect, useState } from "react";
import Lamps from "../components/Lamps";
import { useMediaQuery } from "../hooks/useMediaQuery";
import scales from "../utils/scales";
import ScaleSelect from "../components/ScaleSelect";

const Sequencer = () => {
  const [selectedScale, setSelectedScale] = useState<string[]>(scales.CMajor);
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile) {
      setSelectedScale(selectedScale.slice(0, 4));
    } else if (isTablet) {
      setSelectedScale(selectedScale.slice(0, 6));
    } else {
      setSelectedScale(selectedScale);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTablet, isMobile]);

  return (
    <section className="p-8">
      <div className="container mx-auto mt-24 flex items-center justify-center flex-col">
        <div className="grid-container">
          {selectedScale?.map((note, index) => (
            <Track key={index} note={note} rowIndex={index} />
          ))}
          <Lamps />
        </div>
        <div className="transport-section flex flex-col gap-4">
          <TransportSection />
          <ScaleSelect
            selectedScale={selectedScale}
            setSelectedScale={setSelectedScale}
          />
        </div>
      </div>
    </section>
  );
};

export default Sequencer;
