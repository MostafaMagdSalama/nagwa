// importing mui used components
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";


// importing react built in or other functions  to implement.
import { useEffect, useState , useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// importing my components to be used.
import WordContainer from "../Components/WordContainer";
import SpecialButton from "../Components/UI/SpecialButton";
import ProgressBar from '../Components/UI/ProgressBar';


// importing interfaces to be used.
import { WordInterface } from "../Types/words";

//importing toast component
import { toast } from 'react-toastify';
import GradientText from "../Components/UI/GradientText";

const Home = () => {

  // fetching Questions from the server
  useEffect(() => {
    Axios.get("http://localhost:4000/words")
      .then((data) => {
        console.log(data.data);
        setQuestions(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // setting the useName state
  const [userName , setUserName] = useState('') 

  // isChecked for checking if the user checked his answer or not.
  const [isChecked, setIsChecked] = useState(false);

  // score state for counting the accumalative score achieved.
  const [score, setScore] = useState(0);

  // it's the array of question's state.
  const [questions, setQuestions] = useState<WordInterface[]>([]);

  // word counter used for indexing and showing the upcoming word.
  const [WordsCounter, setWordsCounter] = useState(0);

  // percentage state. 
  const [percent , setPercent] = useState(0)

  // used for showing the chosen answer.
  const [Answer, setAnswer] = useState("");

  // useed for interact with answer.
  const [bgColor, SetbgColor] = useState(true);

  // used for preventing answering the question twice.
  const [Answered , setIsAnswered] = useState(false)
 
  // Hide sound feature state.
  const [HideSound , setHideSound] = useState(false)

  // answers buttons data
  const Chocies = [
    { title: "noun", id: "1" },
    { title: "adjective", id: "2" },
    { title: "verb", id: "3" },
    { title: "adverb", id: "4" },
  ];

  // creating error state
  const [ErrorMessage, setErrorMessage] = useState("");
  const Navigate = useNavigate();

  // fn used to set the student answer
  const SetAnswerHandler = (ans: string) => {
    setAnswer(ans);
  };

 
  useEffect(() => {
    // reset the error message and other state every question.
    setIsChecked(false);
    setErrorMessage("");
    
    // getting the user name 
    const username = localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username') || '' ) : ''
    setUserName(username)
  }, [WordsCounter]);

  const CheckAnswerHandler = () => {

    if( Answered ) {
      setErrorMessage('You can\'t Answer the question twice ')
      return
    }
   
    if (Answer === "" && WordsCounter !== 10) {
      setErrorMessage("You should choose an answer");
    }

    if (Answer === questions[WordsCounter].pos) {
     (function() {toast.success("Right Answer")})() 
      setScore((previousState) => (previousState += 10));
      SetbgColor(false);
      setIsChecked(true);
      setIsAnswered(true);
    }

    if (Answer !== questions[WordsCounter].pos && Answer !== "") {
      (function() {toast.warn("Wrong Answer")})() 
      SetbgColor(false);
      setIsChecked(true);
      setIsAnswered(true)
    }
  };

  

  useCallback( () => {
    ChangePercentHandler()
    getNextQuestion()
  } , [WordsCounter])


  const ChangePercentHandler = () => {
    // here I'm calculating the percentage by dividing the total number of questions over the answered questions.
    const TotalNumberOFQuestions = questions.length  ;
    setPercent( Math.round(((WordsCounter +1) / TotalNumberOFQuestions ) *100) )
    return  percent
  }

  const getResult = () => {
    // storing the result in localStorage to be used in result page.
    localStorage.setItem("score", JSON.stringify(score));
    localStorage.setItem("status", "finished");

    Navigate("/result");
  };

  const getNextQuestion = () => {
    // getting the upcoming questions by changing the counter.
    if(WordsCounter === 9) {setHideSound(true)}
    SetbgColor(true);
    setWordsCounter((counter) => (counter += 1));
    setIsAnswered(false)
    ChangePercentHandler()
    setAnswer("");
  };

console.log(WordsCounter)


  return (
    <Box sx={{
       padding:{xl:'2rem' , lg: '2rem' , md:'2rem' , sm: '2rem' , xs: '2rem'} ,
        color: "#263238" , minHeight:"100vh" }}>
      <Stack justifyContent="space-around" alignItems="center" gap={5} sx={{height:"100%"}}>

        <ProgressBar percent={percent} />

       { userName && <GradientText >Good Luck, {userName}</GradientText> }


        <WordContainer bgc="#C9D8DF" hideSound={HideSound} >
          {questions[WordsCounter]
            ? questions[WordsCounter].word
            : "we're done"}
        </WordContainer>

        {WordsCounter < 10 && (
          <Grid container gap={1} justifyContent="center" alignItems="center">
            {/* showing  answers buttons */}
            {Chocies.map((choice) => {
              return (
                <Grid
                  key={choice.id}
                  item
                  lg={2}
                  md={4}
                  sm={4}
                  xs={12}
                  onClick={() => {
                    SetAnswerHandler.call(this, choice.title);
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      width: '100%',
                      backgroundColor:
                        Answer === choice.title && bgColor
                          ? "#9c27b0"
                          : bgColor
                          ? ""
                          : questions[WordsCounter]?.pos === choice.title
                          ? "green"
                          : "#EB1D36",
                    }}
                  >
                    {choice.title}
                  </Button>
                </Grid>
              );
            })}
          </Grid>
        )}


        <Box>
          {" "}
          your score is <strong>{score}</strong>{" "}
        </Box>

        <Stack
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          gap={3}
        >
          {WordsCounter < 10 && (
            <SpecialButton bgcolor="#263238" action={CheckAnswerHandler}>
              Check Answer
            </SpecialButton>
          )}
          {isChecked && (
            <SpecialButton bgcolor="#263238" action={getNextQuestion}>
              Next
            </SpecialButton>
          )}
          {WordsCounter >= 10 && (
            <SpecialButton bgcolor="#263238" action={getResult}>
              Show Rank
            </SpecialButton>
          )}

        </Stack>

        {ErrorMessage && (
          <Typography sx={{ fontWeight: "900px", color: "white" }}>
            {ErrorMessage}
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default Home;
