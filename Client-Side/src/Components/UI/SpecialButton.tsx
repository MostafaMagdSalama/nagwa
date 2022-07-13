import styled from "@emotion/styled";
import { Button } from "@mui/material";



const SpecialButton = ({children , action , bgcolor}:{children:String , action:any , bgcolor:String|null}) => {


  const StyledButton = styled(Button)(() => ({
    color:'white',
    backgroundColor:`${ bgcolor? bgcolor : '#263238'}`,

    '&:hover':{
      backgroundColor:'#263238',
      color:'white'
    }
    }));
    return (
        <StyledButton variant='contained' onClick={action} disableElevation >{children}</StyledButton>
    );
};

export default SpecialButton;