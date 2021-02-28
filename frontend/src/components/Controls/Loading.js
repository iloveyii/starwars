import React from "react";
import {
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    width: "70vw",
  },
}));

export default function Loading(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <h2>Loading...</h2>
      </div>
    </div>
  );
}
