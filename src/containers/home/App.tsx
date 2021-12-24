import React from 'react'
import cat from './assets/image/cat.jpg'
import './styles/index.scss'

const App: React.FC = () => {
  return <div className='box'>
    <img src={cat} alt="cat" />
  </div>
}

export {
  App
}