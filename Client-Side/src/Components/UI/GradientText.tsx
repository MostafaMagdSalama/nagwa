import { Typography } from '@mui/material';
import styled from "@emotion/styled";


const Styledtext = styled(Typography)(() => ({
    fontWeight:'bold',
    textAlign:'center',
    backgroundImage: `linear-gradient(to left, #30CFD0 35%, #ff0084 100%)`,
    // try both and decide
    // backgroundImage: `linear-gradient(to right,#0f0c29 20%, #302b63 60%, #24243e 100%)`,
    WebkitBackgroundClip:'text',
    WebkitTextFillColor:'transparent',
   
    }));

const GradientText = ({children}:{children:any} ) => {
    return (
        <Styledtext sx={{ fontSize:{ xl:'2rem' , lg:'2rem' , md:'2rem' , sm:'2rem' , xs:'1.5rem'}}} >{children}</Styledtext>
        );
};

export default GradientText;


//  #30CFD0
//  #330867
// sx={{fontWeight:"bold" , fontSize:{xl:'2rem' , lg:'2rem' , md:'2rem' , sm:"2rem" , xs:'1rem' , textAlign:'center' ,  color:'whitesmoke' , backgroundImage: `linear-gradient(to right, #30CFD0 0%, #330867 100%)` }}}