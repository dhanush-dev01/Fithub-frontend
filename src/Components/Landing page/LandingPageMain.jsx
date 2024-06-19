import React from 'react'
import Header from '../Header/HeaderMainComponent'
import Carousel from '../carousel/joggersLandingBlogSection'
import JoggersLandingBlogSection from '../carousel/joggersLandingBlogSection'
import "./styles/LandingPageMain.css"

export default function LandingPageMain() {
  return (
    <div className='LandingPageMainContainer'>
      <Header/>
      <JoggersLandingBlogSection/>
      
    </div>
  )
}
