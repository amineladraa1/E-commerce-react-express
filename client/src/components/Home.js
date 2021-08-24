import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  pushDown: {
    height: theme.mixins.toolbar.minHeight + 10,
  },
}));

function Home() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.pushDown} />
      home
    </>
  );
}

export default Home;
