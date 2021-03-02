import React from "react";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import List from "./_List";
import models from "../../store";
import Loading from "../Controls/Loading";
import "./style.css";

const styles = (theme) => ({
  main: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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

  setForm(props) {
    const { films } = props;

    if (films && Array.isArray(films) && films.length > 0) {
      // Chronological order
      films.sort((a, b) => {
        a = Number(a.release_date.split("-").join(""));
        b = Number(b.release_date.split("-").join(""));
        return a > b ? 1 : a < b ? -1 : 0;
      });
      this.setState({ films });
    }
  }

  componentDidMount() {
    this.setForm(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setForm(nextProps);
  }

  render() {
    const { classes } = this.props;
    const { films } = this.state;
    if (films.length === 0) return <Loading />;

    return (
      <div className="wrapper">
        <div className="container">
          <List films={films} />
        </div>
      </div>
    );
  }
}

/**
 * Get data from store
 * @param state
 */
const mapStateToProps = (state) => ({
  films: state.films.list,
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  readAction: models.films.actions.read,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(Film))
);
