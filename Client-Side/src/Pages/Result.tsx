// importing some mui components to be used
import { Box, Stack, Typography } from "@mui/material";

//import some built in react methods to create the state
import { useEffect, useState } from "react";

// importing use Navigate from react router dom to Navigate to landing page again.
import { useNavigate } from "react-router-dom";

// importing Axios for getting rank from the server
import Axios from "axios";

// import react-toastify to make toast 
import { toastError } from '../Utils/HelperFunctions';

// importing my ui components
import GradientText from "../Components/UI/GradientText";
import SpecialButton from "../Components/UI/SpecialButton";

const Result = () => {
  const [userScore, setUserScore] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    let storedScore: String = localStorage.getItem("score")
      ? JSON.parse(localStorage.getItem("score") || "")
      : "";
    if (!storedScore) Navigate("/");

    Axios.post("http://localhost:4000/rank", { score: storedScore })
      .then((response) => {
        setUserScore(response.data);
      })
      .catch((err) => {
        toastError(err.message)
      });
  }, []);

  const RetakeTest = () => {
    Navigate("/");
  };

  return (
    <Box
      sx={{
        padding: "7rem",
        color: "white",
        height: "100vh"
      }}
    >
      <Stack justifyContent="center" alignItems="center">
        <Box
          sx={{
            width: { lg: "400px", md: "400px", sm: "400px", xs: "250px" },
            height: { lg: "250px", md: "250px", sm: "250px", xs: "200px" },
            backgroundColor: "rgba(37, 40, 48, 0.9)",
            borderRadius: "15px",
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ width: "100%", height: "100%" }}
            gap={3}
          >
            <Typography
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: {
                  xl: "2rem",
                  lg: "2rem",
                  md: "2rem",
                  sm: "2rem",
                  xs: "1.5rem",
                },
              }}
            >
              your Rank is
            </Typography>
            <GradientText>
              {" "}
              <strong> {userScore} </strong>{" "}
            </GradientText>

            <Stack direction="row" justifyContent="center" alignItems="center">
              <SpecialButton bgcolor="#1976d2" action={RetakeTest}>
                Retake it
              </SpecialButton>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Result;
