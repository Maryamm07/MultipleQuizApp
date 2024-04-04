import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Categories from './Components/Categories'
import Quiz from './Components/Quiz'
import Home from './Components/Home'

function App() {

  return (
    <>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/categories" element={<Categories />}/>
            <Route  path="/quiz/:category" element={<Quiz />}/>
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App