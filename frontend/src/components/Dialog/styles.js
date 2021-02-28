import red from "@material-ui/core/colors/red";

export const styles = (theme) => ({
  titleIcon: {
    color: red[500],
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  top: {
    flex: 1,
    textAlign: "center",
  },
  middle: {
    flex: 1,
    textAlign: "center",
  },
  bottom: {
    flex: 1,
    textAlign: "center",
    marginBottom: theme.spacing(2),
  },
});
