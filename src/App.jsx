import { useState } from 'react'
import './grid-system.css';
import './App.css'
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <Navbar></Navbar>
      <div className="container content">
        <Outlet></Outlet>
      </div>
    </>
  )
}

export default App
