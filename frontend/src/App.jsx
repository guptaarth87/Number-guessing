import { useState } from 'react'
import {Routes , Route} from 'react-router-dom'
import './App.css'
import NumberGuessingGame from './Components/NumberGuessingGame/NumberGuessingGame'
import Auth from './Pages/Auth'
import Index from './Pages/Index'
import Footer from './Components/Footer/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/auth' element={<Auth/>}/>
        <Route path='/index' element={<Index/>}/>
        <Route path='/' element={<Index/>}/>
      </Routes>
   
    </>
  )
}

export default App
