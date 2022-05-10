import { Autocomplete, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

export default function ControlledAutoComplete({ control }) {
    return (
      <Controller
        render={({ field }) => (
          <Autocomplete
            {...field}
            options={countries}
            getOptionLabel={(option) => option.label}
            renderOption={(option) => (
              <span>
                {countryToFlag(option.code)}
                {option.label}
              </span>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose a country"
                variant="outlined"
              />
            )}
            onChange={(_, data) => field.onChange(data)}
          />
        )}
        name="country"
        control={control}
      />
    );
  }