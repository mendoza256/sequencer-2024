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
    <FormControl
      sx={{ width: 120, color: (theme) => theme.palette.primary.text }}
      size="small"
    >
      <InputLabel
        sx={{ color: (theme) => theme.palette.primary.text }}
        id="select-scale-label"
      >
        {Object.keys(scales).find((key) => scales[key] === scale)}
      </InputLabel>
      <Select
        sx={{ color: (theme) => theme.palette.primary.text }}
        labelId="select-scale-select"
        id="scale-select"
        value={"value"}
        label="Age"
        onChange={() => onScaleChange}
      >
        {Object.keys(scales).map((scale) => (
          <MenuItem
            value={Object.keys(scales).find((key) => scales[key] === scale)}
            key={scale}
            sx={{ color: (theme) => theme.palette.primary.text }}
          >
            {scale}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScaleSelect;
