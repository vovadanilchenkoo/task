import React from 'react'
import './App.sass'

import MobileNav from './components/MobileNav/MobileNav'
import Header from './components/Header/Header'
import PrimarySection from './components/PrimarySection/PrimarySection'
import AboutCandidate from './components/AboutCandidate/AboutCandidate'
import CheerfulUsers from './components/CheerfulUsers/CheerfulUsers'
import RegForm from './components/RegForm/RegForm'

// TODO: test on sisters computer "retina images"

function App() {
  return (
    <>
      <main>
        <MobileNav />
        <Header />
        <PrimarySection />
        <AboutCandidate />
        <CheerfulUsers />
        <RegForm />
      </main>
      <footer className='footer'>
        © abz.agency specially for the test task
      </footer>
    </>
  )
}

export default App
