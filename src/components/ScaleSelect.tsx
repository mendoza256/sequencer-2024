import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import scales from "../utils/scales";

interface ScaleSelectProps {
  selectedScale: string[];
  setSelectedScale: React.Dispatch<React.SetStateAction<string[]>>;
}

const ScaleSelect = ({ selectedScale, setSelectedScale }: ScaleSelectProps) => {
  function onScaleChange(e: SelectChangeEvent<string>): void {
    const selectedScale = e.target.value;
    setSelectedScale(scales[selectedScale]);
  }

  return (
    <FormControl
      sx={{ width: 120, color: (theme) => theme.palette.primary.dark }}
      size="small"
    >
      <InputLabel
        sx={{ color: (theme) => theme.palette.primary.dark }}
        id="select-scale-label"
      >
        Scale
      </InputLabel>
      <Select
        sx={{ color: (theme) => theme.palette.primary.dark }}
        labelId="select-scale-select"
        id="scale-select"
        value={selectedScale}
        label="Age"
        onChange={() => onScaleChange}
      >
        {Object.keys(scales).map((scaleName) => (
          <MenuItem
            value={scaleName}
            key={scaleName}
            sx={{ color: (theme) => theme.palette.primary.dark }}
          >
            {scaleName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScaleSelect;
