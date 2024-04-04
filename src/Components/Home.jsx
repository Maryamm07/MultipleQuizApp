import { Link } from "react-router-dom"
import "../Style/Home.css"
function Home(){
    return(
        <div>
            <div className="home">
              <div className="text">
                <h1>Welcome to the Quiz App!</h1>
                <p>Introducing our all-in-one Quiz App, Challenge yourself and expand your 
                knowledge with our comprehensive selection of quizzes. Let the learning begin!</p>
              </div>
              <div className="start">
                <Link to="/categories"><button>Let's Get Started</button></Link>
              </div>
            </div>
        </div>
    )
}
export default Home