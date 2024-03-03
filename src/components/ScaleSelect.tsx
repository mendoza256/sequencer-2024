import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import scales from "../utils/scales";

interface ScaleSelectProps {
  scale: string[];
  setScale: React.Dispatch<React.SetStateAction<string[]>>;
}

const ScaleSelect = ({ scale, setScale }: ScaleSelectProps) => {
  function onScaleChange(e: SelectChangeEvent<string>): void {
    const selectedScale = e.target.value;
    setScale(scales[selectedScale]);
  }

  return (
    <FormControl sx={{ width: 120 }} size="small">
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
  );
};

export default ScaleSelect;