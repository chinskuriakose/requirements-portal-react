import React from 'react'
import svg from '../assets/atgeir_logo.svg'

export default function Index() {
  return (
    <div id='home-page'>
        <img src={svg} alt="Atgeir logo" />
        <h1>Welcome to Requirements Portal!</h1>
        <p>This portal can be used to create cloudformation templates based on the client input.</p>
    </div>
  )
}
