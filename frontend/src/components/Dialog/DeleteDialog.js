import React from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";

import Popup from "../Controls/Popup";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { styles } from "./styles";

const useStyles = makeStyles((theme) => styles(theme));

/**
 * Actions <>
 * [
 *  {flag: ''}
 * ]
 * @param {} param0
 */

export default function ConfirmDialog({
  dialog = { title1: "", title2: "", open: false },
}) {
  const {
    title1 = "Are you sure ?",
    title2 = "You won't be able to undo",
    open,
    setOpen,
    action,
  } = dialog;

  const classes = useStyles();

  return (
    <Popup open={open} setOpen={setOpen}>
      <div className={classes.container}>
        <div className={classes.top}>
          <IconButton className={classes.titleIcon}>
            <HelpOutlineIcon />
          </IconButton>
        </div>

        <div className={classes.middle}>
          <Typography variant="h4">{title1}</Typography>
          <Typography variant="subtitle1"> {title2}</Typography>
        </div>

        <div className={classes.bottom}>
          <Button
            style={{ marginTop: "1em" }}
            margin="normal"
            size="large"
            variant="contained"
            color="secondary"
            onClick={(e) => {
              action(e);
              setOpen(false);
            }}
          >
            Yes
          </Button>

          <Button
            style={{ marginTop: "1em", marginLeft: "2em" }}
            margin="normal"
            size="large"
            variant="contained"
            color="primary"
            onClick={() => setOpen(false)}
          >
            No
          </Button>
        </div>
      </div>
    </Popup>
  );
}
