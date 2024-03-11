import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import scales, { Scale } from "../utils/scales";

interface ScaleSelectProps {
  selectedScale: Scale;
  setSelectedScale: React.Dispatch<React.SetStateAction<Scale>>;
}

const ScaleSelect = ({ selectedScale, setSelectedScale }: ScaleSelectProps) => {
  function onScaleChange(e: SelectChangeEvent<string>): void {
    const scale = scales.find((scale) => scale.name === e.target.value);
    setSelectedScale(scale || { name: "", value: [] });
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
        value={selectedScale.name}
        label="Age"
        onChange={onScaleChange}
      >
        {scales.map((scale) => (
          <MenuItem
            value={scale.name}
            key={scale.name}
            sx={{ color: (theme) => theme.palette.primary.dark }}
          >
            {scale.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ScaleSelect;
