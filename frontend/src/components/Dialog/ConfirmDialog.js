import React, { useState } from "react";
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import Popup from "../Controls/Popup";
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
  const [form, setForm] = useState({ reason: "" });

  return (
    <Popup open={open} setOpen={setOpen}>
      <div className={classes.container}>
        <div style={{ marginBottom: "12px" }}>
          <p style={{ textAlign: "right", margin: 0 }}>
            <HighlightOffIcon
              style={{ cursor: "pointer" }}
              onClick={() => setOpen(false)}
            />
          </p>
          <Typography
            style={{ textTransform: "none", textAlign: "center" }}
            variant="subtitle1"
          >
            Avbryt förfrågan
          </Typography>
        </div>

        <div>
          <TextField
            multiline={true}
            rows={4}
            fullWidth={true}
            type="text"
            margin="none"
            label="Vad är orsaken?"
            variant="outlined"
            name="reason"
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            value={form.reason}
          />
        </div>

        <div className={classes.bottom}>
          <Button
            style={{ marginTop: "1em", marginRight: "2em" }}
            margin="normal"
            size="large"
            variant="contained"
            color="default"
            onClick={() => setOpen(false)}
          >
            NEJ
          </Button>
          <Button
            style={{ marginTop: "1em" }}
            margin="normal"
            size="large"
            variant="contained"
            color="primary"
            onClick={(e) => {
              action(e, form);
              setOpen(false);
            }}
          >
            JA
          </Button>
        </div>
      </div>
    </Popup>
  );
}
