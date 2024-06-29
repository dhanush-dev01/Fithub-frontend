import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import "./styles/chatStyles.scss"

const Home = () => {
  return (
    <div className='home'>
      <div className="container1">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home