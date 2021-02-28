const drawerWidth = 240;

export const styles = (theme) => ({
  main: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  table: {
    minWidth: 650,
    // marginTop: theme.spacing(3)
  },
  headerCell: {
    cursor: "pointer",
    "&:hover": {
      fontWeight: "bold",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(0),
  },
});
