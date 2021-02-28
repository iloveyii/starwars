import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import models from "../../store";

const styles = (theme) => ({
  card: {
    // marginTop: theme.spacing(1),
    textAlign: "center",
    border: "1px solid grey",
    padding: theme.spacing(3),
    marginBottom: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
  },
  title: {
    flex: 1,
    border: "none",
  },
  release_date: {
    flex: 1,
    textAlign: "center",
  },
});

const useStyles = makeStyles((theme) => styles(theme));

const Card = ({ film, i }) => {
  const classes = useStyles();
  return (
    <Link to={`/films/view/${i}`} className={classes.card}>
      <h2 className={classes.title}>{film.title}</h2>
      <h3 className={classes.title}>{film.release_date}</h3>
    </Link>
  );
};

class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [],
      i: 0,
    };
  }

  setForm(props) {
    const { films, match } = props;
    const { id } = match.params;

    if (films && Array.isArray(films) && films.length > 0) {
      // Chronological order
      films.sort((a, b) => {
        a = Number(a.release_date.split("-").join(""));
        b = Number(b.release_date.split("-").join(""));
        return a > b ? 1 : a < b ? -1 : 0;
      });
      this.setState({ films, i: id });
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
    const { films, i } = this.state;

    return (
      <div className={classes.main}>
        <h1>View</h1>
        {films && films[i] && <Card film={films[i]} />}
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
  withRouter(connect(mapStateToProps, mapActionsToProps)(View))
);
