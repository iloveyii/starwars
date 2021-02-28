import React from "react";
import PageHeader from "../Controls/PageHeader";
import { Container } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Header } from "../../layouts";

import models from "../../store";
import { styles } from "./styles";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        ready: {
          fullScreen: true,
          showHeader: false,
          footer: false,
          drawer: false,
        },
      },
    };
  }

  setForm(props) {
    const { settings } = props;
    if (settings && settings.length > 0) {
      this.setState({ settings });
    }
  }

  componentDidMount() {
    this.setForm(this.props);
  }

  componentWillReceiveProps(nextProps, context) {
    console.log("componentWillReceiveProps Order");
    this.setForm(nextProps);
  }

  // ----------------------------------
  // Order
  // ----------------------------------

  render() {
    const { classes } = this.props;
    const { settings } = this.state;

    return (
      <div className={classes.main}>
        <Header />
        <Container
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <PageHeader
            title="Settings"
            subtitle="Inställingar"
            imageUrl="/images/restaurant.jpg"
          />
          <br />
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
  settings:
    state.settings.list && state.settings.list[0] ? state.settings.list : {},
});

/**
 * Import action from dir action above - but must be passed to connect method in order to trigger reducer in store
 * @type {{readAction: UserReadAction}}
 */
const mapActionsToProps = {
  createAction: models.settings.actions.create,
  readAction: models.settings.actions.read,
  editAction: models.settings.actions.edit,
  deleteAction: models.settings.actions.delete,
  updateAction: models.settings.actions.update,
  confirmsEditAction: models.confirms.actions.edit,
};

export default withStyles(styles)(
  withRouter(connect(mapStateToProps, mapActionsToProps)(Settings))
);
