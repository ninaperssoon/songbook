import { useState } from 'react'
import './App.css'
import Header from './components/header.jsx'
import Songs from './components/songs.jsx'
import Tabs from './components/tabs.jsx'


function App() {

  return (
    <>
      <Header />
      <input type='text' placeholder='Sök efter sång'></input>
      <Tabs />

      <Songs />
    </>
  )
}

export default App
