
// import mui components to be used.

import { Box, Typography, Stack, Button } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";




// import my components.
import UserForm from "../Components/UserForm";
import GradientText from "../Components/UI/GradientText";


const Welcoming = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("status", "start");
  }, []);
  const startTest = () => {
    localStorage.setItem("status", "inProgress");
    Navigate("/test");
  };
  // {xl:'100vh' , lg:'90vh' , md:'90vh' , sm:'90vh' ,xs:'97vh'}
  return (
    <Box sx={{  color:"white" , height:"100vh"}}>
    <Stack justifyContent='center' alignItems='center' gap={3} sx={{height:'100%' , width:'100%' }}>
      <GradientText>NOW YOU CAN TEST YOUR ENGLISH WITH US.</GradientText>
      <GradientText>START NOW</GradientText>
      <UserForm />
    </Stack>
    </Box>
  );
};

export default Welcoming;
