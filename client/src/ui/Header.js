import { AppBar, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [value, setValue] = useState(0);

  /// in eatch rerender we fix the value to match the path we currently in
  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        setValue(0);
        break;
      case "/signup":
        setValue(1);
        break;
      case "/signin":
        setValue(2);
        break;
      default:
        break;
    }
  }, []);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar color="primary" position="fixed" elevation={1}>
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
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
