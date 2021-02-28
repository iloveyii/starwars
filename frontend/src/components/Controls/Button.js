import React from "react";
import { Container, Paper, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { green } from "@material-ui/core/colors";
import Icon from "@material-ui/core/Icon";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

export default function Btn(props) {
  const { onClick, Icon } = props;

  return (
    <Button
      style={{
        marginTop: "1em",
        float: "right",
        marginBottom: 20,
        marginLeft: 5,
      }}
      margin="small"
      size="large"
      variant="contained"
      color="primary"
      startIcon={Icon ? <Icon /> : <AddCircleOutlineIcon />}
      onClick={onClick}
    ></Button>
  );
}
