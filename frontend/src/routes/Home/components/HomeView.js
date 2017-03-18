import React from 'react'
import DivanteLogo from '../assets/divante.png'
import './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <img
      alt='Divante'
      className='divante'
      src={DivanteLogo} />
  </div>
)

export default HomeView
