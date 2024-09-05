import * as React from "react";
import { Box, Typography, Button, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";

const ageGroups = [
  { label: "Adult", ageRange: "13-99 years" },
  { label: "Child", ageRange: "4-12 years" },
  { label: "Infant", ageRange: "0-3 years" },
];

export default function CustomDropdown() {
  const [counts, setCounts] = React.useState({
    Adult: 0,
    Child: 0,
    Infant: 0,
  });
  const [open, setOpen] = React.useState(false);
  const [selectedGroups, setSelectedGroups] = React.useState(ageGroups.map(group => group.label)); // Initialize with all labels

  const handleIncrement = (name) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [name]: prevCounts[name] + 1,
    }));
  };

  const handleDecrement = (name) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [name]: prevCounts[name] > 0 ? prevCounts[name] - 1 : 0,
    }));
  };

  const toggleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="custom-dropdown-label">Select Passengers</InputLabel>
      <Select
        labelId="custom-dropdown-label"
        id="custom-dropdown"
        multiple
        value={selectedGroups}  {/* Use selectedGroups state */}
        input={<OutlinedInput label="Select Passengers" />}
        open={open}
        onClose={toggleOpen}
        onOpen={toggleOpen}
        renderValue={() => selectedGroups.join(", ")}  {/* Render all selected groups */}
      >
        {ageGroups.map((group) => (
          <MenuItem key={group.label} disableGutters>
            <Box display="flex" flexDirection="column" width="100%">
              <Typography variant="h6">{group.label}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {group.ageRange}
              </Typography>
              <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                <Button
                  onClick={() => handleDecrement(group.label)}
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: "30px", marginRight: 1 }}
                >
                  -
                </Button>
                <TextField
                  value={counts[group.label]}
                  size="small"
                  inputProps={{ style: { textAlign: 'center' } }}
                  sx={{ width: 50, marginRight: 1 }}
                  disabled
                />
                <Button
                  onClick={() => handleIncrement(group.label)}
                  variant="outlined"
                  size="small"
                  sx={{ minWidth: "30px" }}
                >
                  +
                </Button>
              </Box>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
