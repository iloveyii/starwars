import React from "react";
import {
  Container,
  Paper,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { withStyles } from "@material-ui/styles";
import IconTextField from "../Controls/IconTextField";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import HomeWorkOutlinedIcon from "@material-ui/icons/HomeWorkOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { ObjectID } from "bson";
import ColoredLinearProgress from "../Controls/LineProgress";
import List from "./List";

import models from "../../store";

import "./style.css";
import { CenterFocusStrong } from "@material-ui/icons";

const styles = (theme) => ({
  root: {
    // marginTop: theme.spacing(1),
    textAlign: "center",
    "& .MuiCardMedia-root": {
      margin: theme.spacing(2),
    },
  },
  outer: {
    display: "flex",
    flexDirection: "column",
    border: "none",
  },
  details: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    textAlign: "center",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  icon: {
    display: "flex",
    alignSelf: "center",
  },
});

class Film extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      form: models.films.form,
      form_errors: {},
    };
  }

  setForm(props) {}

  componentDidMount() {
    this.setForm(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setForm(nextProps);
  }

  render() {
    const { classes } = this.props;
    const { films } = this.state;

    return (
      <div className={classes.main}>
        <Container maxWidth="md">
          <List />
        </Container>
      </div>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  form: state.logins.form,
  actions: state.logins.actions,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  createAction: models.logins.actions.create,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(Film))
);
