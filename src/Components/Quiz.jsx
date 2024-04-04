import { useEffect, useState } from "react"
import Questions from "./Questions";
import { useParams } from "react-router-dom";
import "../Style/Quiz.css"

function Quiz(){
    const [ userName, setUserName ] = useState('');
    const [ showQuiz, setShowQuiz ] = useState(false)
    const [ showScore, setShowscore ] = useState(false)
    const [ score, setScore ] = useState(0)
    const [ currentQuestion, setCurrentQuestion ] = useState(0)
    const [ lock, setLock ] = useState(false)
    const { category } = useParams()
    const categoryQuestion = Questions.filter(question => question.category === category)
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
        setScore(0)
        setCurrentQuestion(0)
        setSelectedAnswers(Array(categoryQuestion.length).fill(null));
    },[category])
    
    const handleInput = () => {
        if(userName.trim() !== ''){
            localStorage.setItem('quizUsername', userName);
            setShowQuiz(true)
        }else{
            alert("Please enter your name before starting the quiz.");
        }
    }
    const CorrectAnswer = (isCorrect) => {
        if(lock === false){
            setLock(true)
        if(isCorrect === true){
            setScore(score + 1)
            localStorage.setItem('quizScore', score + 1);
        }
      }
    }
    const previous = () => {
        setCurrentQuestion(currentQuestion - 1)
    }
    const next = () => {
        setLock(false)
        const nextQuestion = currentQuestion + 1;
        if(nextQuestion < categoryQuestion.length){
            setCurrentQuestion(nextQuestion)
        }else{
            setShowscore(true)
        }
    }

    const handleAnswerSelect = (answerIndex) => {
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
        CorrectAnswer(categoryQuestion[currentQuestion].answerOptions[answerIndex].isCorrect);
    }
    
    return(
        <div>
            { !showQuiz ? (
                <div className="username">
                    <h2>Enter your name!</h2>    
                    <div className="inp">
                        <input type="text" placeholder="Enter your name..." value={userName} onChange={(e) => {setUserName(e.target.value)}}/>
                    </div>
                    <div className="NextBtn">
                        <button onClick={handleInput}>Start the Quiz</button>
                    </div>
                </div>
            ): (
             <>
                <div className="heading" style={{ display: showScore ? 'none' : 'block' }}>
                    <h1>Welcome to the Quiz {userName}!</h1>
                </div>
                <div className="Quiz">
                    { showScore ? (
                        <div className="scoreSection">
                            { score === 10 ? (
                                <h1>Congratulations, You scored 10 out of 10!🎉</h1>
                            ) : score < 5 ? (
                                <h1>You scored {score} out of {categoryQuestion.length} Better luck
                                next time...</h1>
                            ) : (
                                <h1>You scored {score} out of {categoryQuestion.length}!🎉</h1>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="questionSection">
                                <div className="questionCount">
                                    <h1>Question {currentQuestion + 1}<span>/{categoryQuestion.length}</span></h1>
                                </div>
                                <div className="questionText">
                                    <p>{categoryQuestion[currentQuestion]?.questionText}</p>
                                </div>
                                <div className="answerSection">
                                    {categoryQuestion[currentQuestion].answerOptions.map((answerOption, index) => {
                                        return(
                                            <button key={index} onClick={() => {
                                                CorrectAnswer(answerOption.isCorrect);
                                                handleAnswerSelect(index); // Update selected answer
                                            }}
                                            disabled={selectedAnswers[currentQuestion] !== null}
                                            className={`answer-button ${lock && answerOption.isCorrect ? "correct" : ""}
                                            ${lock && !answerOption.isCorrect ? "wrong" : ""}`}>
                                                {answerOption.answerText}
                                            </button>
                                        )
                                    })}
                                </div>
                                <div className="next">
                                    <button onClick={previous} disabled={currentQuestion === 0} >Previous</button>
                                    <button onClick={next}>Next</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
             </>
            )}
        </div>
    )
}
export default Quiz