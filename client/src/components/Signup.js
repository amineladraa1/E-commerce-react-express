import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
  useTheme,
  Snackbar,
} from "@material-ui/core";
import React, { useState } from "react";
import Bground from "../assets/background.jpg";
import { signUp } from "../api";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  bgRoot: {
    // height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `linear-gradient(to top ,rgba(255,255,255,0.35),rgba(0,0,0,0.85)), url(${Bground})`,
    backgroundAttachment: "fixed",
    width: "100%",
    height: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    overflow: "hidden",
  },
  txtFields: {
    "& .MuiInputBase-input": {
      color: theme.palette.common.pinkWhite,
    },
    "& label.Mui-focused": {
      color: theme.palette.common.pinkWhite,
    },
    "& label": {
      color: theme.palette.common.pinkWhite,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.common.pinkWhite,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.common.pinkWhite,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.common.pinkWhite,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.common.pinkWhite,
      },
    },
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Signup({ setValue }) {
  const classes = useStyle();
  const theme = useTheme();
  const history = useHistory();
  const [error, setError] = useState("");

  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setError(false);
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const { data } = await signUp(values);
      setOpen(true);
      setTimeout(function () {
        history.push("/signin");
        setValue(2);
      }, 3000);
    } catch (error) {
      setError(error.response.data.error);
      setOpen(true);
    }
  };

  return (
    <div className={classes.bgRoot}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={error ? "error" : "success"}>
          {error ? error : "you are signed up !! redirecting you to sign in"}
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ width: "40rem", height: "50rem" }}
      >
        <Grid item>
          <Typography
            variant="h3"
            gutterBottom
            style={{ color: theme.palette.common.pinkWhite }}
          >
            SIGN UP
          </Typography>
        </Grid>
        <Grid item style={{ width: "100%", marginBottom: "2rem" }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            name="name"
            className={classes.txtFields}
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={{ width: "100%", marginBottom: "2rem" }}>
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth
            name="email"
            className={classes.txtFields}
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={{ width: "100%", marginBottom: "2rem" }}>
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
            className={classes.txtFields}
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={{ width: "100%" }}>
          <Button
            color="secondary"
            style={{ color: "#fff" }}
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Signup;
