import { Typography, Stack } from "@mui/material";
import { Box } from "@mui/system";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import {toastError} from "../Utils/HelperFunctions"
const WordContainer = ({
  children,
  hideSound,
  bgc,
}: {
  children: React.ReactNode;
  hideSound: Boolean;
  bgc: String;
}) => {
  const speechHandler = (word: string) => {
    if ("speechSynthesis" in window) {
      let speech = new SpeechSynthesisUtterance();
      speech.text = word;
      speech.lang = "en-US";
      window.speechSynthesis.speak(speech);
    } else { 
      toastError("speech dosen't supported to your browser");
    }
  };

  return (
    <Box
      sx={{
        width: { lg: "400px", md: "400px", sm: "400px", xs: "300px" },
        height: { lg: "150px", md: "150px", sm: "100px", xs: "100px" },
        backgroundColor: `${bgc}`,
        color: "black",
        borderRadius: "15px",
      }}
    >
      <Stack
      gap={{md:1,xs:5}}
      
        sx={{
          width: "100%",
          height: {
            xl: "80%",
            lg: "150px",
            md: "150px",
            sm: "100px",
            xs: "100px",
          },
          flexDirection:{ md:"column",xs:"row-reverse"}
        }}
        justifyContent="center"
        alignItems="center"
      
      >
        <Typography
        align="center"
          sx={{
            
            fontSize: {
              xl: "2rem",
              lg: "2rem",
              md: "2rem",
              sm: "1.8rem",
              xs: "1.5rem",
            },
            letterSpacing: "1.3px",
            fontWeight: "bolder",
          }}
        >
          {children?.toString().toUpperCase()}
        </Typography>
      

      {!hideSound && (
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ cursor: "pointer",  alignSelf:{md:"start"} , marginLeft:{md:"40px"} }}
        >
          <VolumeUpIcon
            sx={{
             
              fontSize: {
                xl: "2rem",
                lg: "2rem",
                md: "2rem",
                sm: "1.8rem",
                xs: "1.8rem",
              },
              marginLeft: "10%",
            }}
            onClick={() => speechHandler(children ? children.toString() : "")}
          ></VolumeUpIcon>
        </Stack>
      )}
      </Stack>
    </Box>
  );
};

export default WordContainer;
