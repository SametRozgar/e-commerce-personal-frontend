import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from "./components/Navbar.jsx"
import Login from "./pages/Login.jsx"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home.jsx"

function App() {

  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
