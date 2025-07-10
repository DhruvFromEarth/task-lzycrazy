import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Careers from './pages/Careers'
import Email from './pages/Email'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Careers />} />
        <Route path="/email" element={<Email />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
