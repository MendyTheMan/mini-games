import { Route, Routes } from 'react-router'
import TicTacToe from './TicTacToe'
import Connect4 from './Connect4'
import './App.css'

function App() {

  return (
    <TicTacToe />
  )
}

export default App

// {/* <Routes>
//       <Route index element={<TicTacToe />} />
//       <Route path="connect4" element={<Connect4 />} />
//     </Routes> */}
