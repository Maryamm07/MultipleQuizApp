import Questions from "./Questions";
import { Link } from "react-router-dom";
import "../Style/Categories.css"

function Categories(){
    const storedUsername = localStorage.getItem('quizUsername');
    const storedScore = localStorage.getItem('quizScore');
    const categories = [...new Set(Questions.map(question => question.category))];
    return(
        <div className="category">
          <div className="txt">
            <h1>Below are the listed categories. Select one to start your quiz adventure!</h1>
            {storedUsername && <p>Welcome back, {storedUsername}!</p>}
            {storedScore && <p>Your previous score: {storedScore}</p>}
          </div>
          <div className="links">
            {categories.map((category, index) => (
                <Link to={`/quiz/${category}`} key={index}><button>{category}</button></Link>
            ))}
          </div>
        </div>
    )
}
export default Categories