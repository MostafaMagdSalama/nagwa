// mui used components
import { Box, TextField, Typography, Button, Stack } from "@mui/material";

// importing formik methods which is the form validator.
import { useFormik } from "formik";

// creating userName valid state.
import { useState } from "react";

// importing routing method from react.
import { useNavigate } from "react-router-dom";

const UserForm = () => {
  const Navigate = useNavigate();

  const [userNameIsValid, setUserNameIsValid] = useState(false);

  // creating error state
  const [ErrorMessage, setErrorMessage] = useState("");

  const SubmitHandler = (event: any) => {
    event.preventDefault();
    if (userNameIsValid) {
      localStorage.setItem("username", JSON.stringify(formik.values.userName));
      startTest();
    }
  };

  const startTest = () => {
    localStorage.setItem("status", "inProgress");
    Navigate("/test");
  };

  const validate = (values: any) => {
    const errors = {
      userName: "",
    };

    if (!values.userName.trim()) {
      errors.userName = "Required";
      setErrorMessage("Required");
      setUserNameIsValid(false);
    } else if (values.userName.trim().length < 4) {
      errors.userName = "Minimum name is 4 characters";
      setErrorMessage("Minimum name is 4 characters");
      setUserNameIsValid(false);
    } else if (values.userName.trim().length > 20) {
      errors.userName = "It's too long name";
      setErrorMessage("It's too long name");
      setUserNameIsValid(false);
    } else if (isFinite(values.userName)) {
      errors.userName = "Invalid user name";
      setErrorMessage("Invalid user name");
    } else {
      setUserNameIsValid(true);
      setErrorMessage("");
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    validate,
    onSubmit: SubmitHandler,
  });

  return (
    <Box
      component="form"
      autoComplete="off"
      sx={{
        "& .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root": {
          color: "white",
        },
        width: { xl: "20%", lg: "40%", md: "40%", sm: "40%", xs: "70%" },
        paddingRight: "auto",
        paddingLeft: "auto",
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-around"
        alignItems="center"
        sx={{ height: "100%", width: "100%" }}
        gap={3}
      >
        <TextField
          required
          id="userName"
          label="Name"
          name="userName"
          placeholder="Enter your name"
          autoComplete="off"
          InputLabelProps={{ style: { color: "white" } }}
          FormHelperTextProps={{ style: { display: "none" } }}
          sx={{
            backgroundColor: "rgba(37, 40, 48, 0.9)",
            color: "white !important",
            borderRadius: "3px",
            width: "100%",
          }}
          onChange={formik.handleChange}
          error={!!formik.errors.userName && formik.touched.userName}
          helperText={formik.errors.userName}
          value={formik.values.userName}
          onBlur={formik.handleBlur}
        />

        {ErrorMessage && (
          <Typography
            sx={{ fontWeight: "900px", color: "rgba(37, 40, 48, 0.9)" }}
          >
            {ErrorMessage}
          </Typography>
        )}

        <Button
          color="primary"
          onClick={SubmitHandler}
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#263238",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default UserForm;
