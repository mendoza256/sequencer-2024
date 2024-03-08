import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useEffect, useState } from "react";
import Lamps from "../components/Lamps";
import { useMediaQuery } from "../hooks/useMediaQuery";
import scales from "../utils/scales";
import ScaleSelect from "../components/ScaleSelect";

const Sequencer = () => {
  const [scale, setScale] = useState<string[]>(scales.CMajor);
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    setScale(scale.slice(0, 1));

    // FIXME add back when performance is better
    // if (isMobile) {
    //   setScale(scale.slice(0, 4));
    // } else if (isTablet) {
    //   setScale(scale.slice(0, 6));
    // } else {
    //   setScale(scale);
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [scale, isTablet, isMobile]);

    // FIXME adding scale to the dependency array causes the sequencer to re-render on every scale change
  }, [isTablet, isMobile]);

  return (
    <section className="p-8">
      <div className="container mx-auto mt-24 flex items-center justify-center flex-col">
        <div className="grid-container">
          {scale?.map((note, index) => (
            <Track key={index} note={note} rowIndex={index} />
          ))}
          <Lamps />
        </div>
        <div className="transport-section flex flex-col gap-4">
          <TransportSection />
          <ScaleSelect scale={scale} setScale={setScale} />
        </div>
      </div>
    </section>
  );
};

export default Sequencer;
