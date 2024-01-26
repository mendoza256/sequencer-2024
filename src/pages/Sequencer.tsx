import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useEffect, useState } from "react";
import Lamps from "../components/Lamps";
import { useMediaQuery } from "../hooks/useMediaQuery";
import scales from "../utils/scales";

const Sequencer = () => {
  const [scale, setScale] = useState<string[]>(scales.CMajor);
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const isMobile = useMediaQuery("(max-width: 767px)");

  useEffect(() => {
    if (isMobile) {
      setScale(scale.slice(0, 4));
    } else if (isTablet) {
      setScale(scale.slice(0, 6));
    } else {
      setScale(scale);
    }
    console.log("scale", scale);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, isTablet, isMobile]);

  function onScaleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedScale = e.target.value;

    setScale(scales[selectedScale]);
  }

  return (
    <>
      <select onChange={onScaleChange}>
        {Object.keys(scales).map((scale) => (
          <option key={scale}>{scale}</option>
        ))}
      </select>
      {scale?.map((note, index) => (
        <Track key={index} note={note} rowIndex={index} />
      ))}
      <Lamps />
      <TransportSection />
    </>
  );
};

export default Sequencer;
