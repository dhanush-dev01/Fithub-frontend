import React from 'react'
import Header from '../Header/HeaderMainComponent'
import "./styles/LandingPageMain.css"
import JoggersLandingBlogSection from '../carousel/joggersLandingBlogSection'

export default function LandingPageMain() {
  return (
    <div className='LandingPageMainContainer'>
      <JoggersLandingBlogSection/>
    </div>
  )
}
