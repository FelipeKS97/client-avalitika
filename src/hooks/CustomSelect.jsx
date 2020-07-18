import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

export default function useSelect(options, label) {
  const [value, setValue] = useState("");
  const random = Math.random();
  const select = (
    <FormControl style={{ width: "100%" }}>
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId="simple-select-label"
        id="simple-select-label"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {" "}
        {options &&
          options.map((op, i) => (
            <MenuItem key={i} value={op.id}>
              {op.name || op.description}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
  return [value, select];
}
