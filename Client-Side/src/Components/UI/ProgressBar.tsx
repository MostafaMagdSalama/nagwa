import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Stack alignItems={"center"} direction={{xs:"column-reverse" , sm:"row",md:"row"}} gap={{xs:3}} >
      <Box
        sx={{
          width: '100%',
          mr: 1,
          // width: { xs: "90vw" },
        
        }}
      >
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography
          fontWeight="bold"
          variant="body2"
          color="text.secondary"
          sx={{fontSize:{xs:"2em", sm:"1.3em", md:"1.3em"}}}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Stack>
  );
}

export default function ProgressBar({ percent }: { percent: number }) {
  return (
    <Box sx={{ width: {xs:"80vw" } , }}>
      <LinearProgressWithLabel value={percent} sx={{ height:"20px" , borderRadius:"20px"}} />
    </Box>
  );
}
