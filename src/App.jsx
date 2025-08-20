import { useState } from 'react'
import './App.css'
import Header from './components/header.jsx'
import Songs from './components/songs.jsx'
import Tabs from './components/tabs.jsx'


function App() {

  return (
    <>
      <Header />
      <Tabs />
      <Songs />
    </>
  )
}

export default App
