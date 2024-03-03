import TransportSection from "../components/TransportSection";
import Track from "../components/Track";
import { useEffect, useState } from "react";
import Lamps from "../components/Lamps";
import { useMediaQuery } from "../hooks/useMediaQuery";
import scales from "../utils/scales";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale, isTablet, isMobile]);

  function onScaleChange(e: SelectChangeEvent<string>): void {
    const selectedScale = e.target.value;

    setScale(scales[selectedScale]);
  }

  return (
    <div className="container mx-auto">
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="select-scale-label">Scale</InputLabel>
        <Select
          labelId="select-scale-select"
          id="scale-select"
          value={Object.keys(scales).find((key) => scales[key] === scale)}
          label="Age"
          onChange={onScaleChange}
        >
          {Object.keys(scales).map((scale) => (
            <MenuItem value={scale} key={scale}>
              {scale}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {scale?.map((note, index) => (
        <Track key={index} note={note} rowIndex={index} />
      ))}
      <Lamps />
      <TransportSection />
    </div>
  );
};

export default Sequencer;
