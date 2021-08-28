import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { signOut } from "../api";
import { signOutAuth, isAuthenticated } from "../auth";

const useStyles = makeStyles((theme) => ({
  signOutButton: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
}));

function UseforceRerender() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

function Header({ value, setValue }) {
  const history = useHistory();
  const classes = useStyles();
  const forceRerender = UseforceRerender();
  /// in eatch rerender we fix the value to match the path we currently in
  useEffect(() => {
    switch (history.location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/user/dashboard":
        setValue(1);
        break;
      case "/signup":
        setValue(2);
        break;
      case "/signin":
        setValue(3);
        break;
      default:
        break;
    }
  }, [history.location.pathname, setValue]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const callBack = async () => {
    try {
      const res = await signOut();
      // history.push("/");
      console.log(res);
      setValue(0);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <AppBar
        color="primary"
        position="fixed"
        elevation={1}
        className={classes.appBar}
      >
        <Toolbar>
          <Typography variant="h6">Books Ecommerce</Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            style={{ marginLeft: "auto" }}
            indicatorColor="secondary"
          >
            <Tab
              label="Home"
              component={Link}
              to="/"
              style={{ textTransform: "none", fontSize: "1rem" }}
            />
            <Tab
              label="Dashboard"
              component={Link}
              to="/user/dashboard"
              style={{ textTransform: "none", fontSize: "1rem" }}
            />
            {!isAuthenticated() && (
              <>
                <Tab
                  label="Sign Up"
                  component={Link}
                  to="/signup"
                  style={{ textTransform: "none", fontSize: "1rem" }}
                />
                <Tab
                  label="Sign In"
                  component={Link}
                  to="/signin"
                  style={{ textTransform: "none", fontSize: "1rem" }}
                />{" "}
              </>
            )}
          </Tabs>
          {isAuthenticated() && (
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              disableRipple
              style={{
                color: "#fff",
                textTransform: "none",
                marginLeft: "2em",
              }}
              className={classes.signOutButton}
              onClick={() => {
                signOutAuth(callBack);
                forceRerender();
              }}
            >
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withRouter(Header);
