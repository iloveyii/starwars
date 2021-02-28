import React from "react";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  InputBase,
  InputLabel,
  Label,
  FormLabel,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function Select2({ name, restaurant }) {
  const field = "name_swedish";
  if (!restaurant) return "Loading...";
  return (
    <FormControl>
      <TextField
        margin="normal"
        label="Category"
        variant="outlined"
        name={name}
        readOnly={true}
        value={restaurant.currentCategory?.name_swedish}
      />
      {/** category, dish, open = undefined, refresh = false, action = null */}
      {restaurant.filterCategories.map((cat, i) => (
        <MenuItem
          dense={cat.name_swedish != restaurant.currentCategory.name_swedish}
          value={cat}
          key={i}
          onClick={() => restaurant.setCurrent(cat, null, null, true)}
        >
          {cat[field]}
        </MenuItem>
      ))}
    </FormControl>
  );
}
