import React, { useEffect, useState } from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ProfSelector({
  classes,
  rowData,
  curriculum,
  period,
  profsList,
  newClassList,
  setNewClassList,
}) {
  const [value, setValue] = useState([]);

  const actualClasses =
    classes.length > 0 && classes.filter((c) => c.discipline_id === rowData.id);

  let filteredClasses =
    actualClasses.length > 0 &&
    actualClasses.map((c) => {
      return {
        prof_name: c.prof_name,
        discipline_id: rowData.id,
        professor_id: c.professor_id,
      };
    });

  useEffect(() => {
    if (filteredClasses && curriculum && period) {
      setValue([...filteredClasses]);
      setNewClassList((previousState) => [
        ...filteredClasses,
        ...previousState,
      ]);
    } else {
      setValue([]);
    }
  }, [classes, curriculum, period]);

  function formatProfs(prof) {
    return prof.map((p) => {
      return {
        prof_name: p.fullname,
        discipline_id: rowData.id,
        professor_id: p.id,
      };
    });
  }
  const profsValue = formatProfs(profsList);

  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      noOptionsText={"Vazio"}
      onChange={(event, newValue) => {
        if (filteredClasses) {
          setValue([
            ...newValue.filter(
              (option) => filteredClasses.indexOf(option) === -1
            ),
          ]);
        } else {
          setValue([...newValue]);
        }
        setNewClassList((previousState) => [
          ...newValue,
          ...previousState.filter((option) => value.indexOf(option) === -1),
        ]);
      }}
      options={profsValue}
      getOptionSelected={(option, value) => {
        if (option.professor_id === value.professor_id) return true;
      }}
      getOptionLabel={(option) => option.prof_name}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            label={option && option.prof_name}
            {...getTagProps({ index })}
            //disabled={fixedOptions.indexOf(option) !== -1}
          />
        ))
      }
      style={{ width: 500 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Professor(es)"
          variant="outlined"
          placeholder="Adicionar Professor..."
        />
      )}
    />
  );
}
