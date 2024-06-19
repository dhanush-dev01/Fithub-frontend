import React, { useCallback, useEffect, useState } from 'react';
import { client } from "../../client";
import './About.css'; // Import the CSS file for unique styling

const About = () => {
  const [about,setAbout]= useState(false);
  const[isAboutLoading, setisAboutLoading] = useState(false);

  const cleanUpAbout = useCallback((rawdata) => {
    const { sys, fields } = rawdata;
    const { id } = sys;
    const aboutTitle = fields.title;
    const aboutContent = fields.content;
    const aboutImage = fields.image.fields.file.url;
    const cleanAbout = { id, aboutTitle, aboutContent, aboutImage };

    setAbout(cleanAbout);
  },[]);

  const getabout = useCallback(async () => {
    setisAboutLoading(true);
    try {
      const response = await client.getEntry("3LGNU6zrZqiZF9xbalTx3N");
      if(response){
        cleanUpAbout(response)
      }else{
        setAbout({})
      }
      setisAboutLoading(false);
    } catch (error) {
      console.log(error);
      setisAboutLoading(false);
    }
  },[cleanUpAbout]);

  useEffect(()=>{
    getabout()
  },[getabout]);

  const {aboutImage, aboutTitle, aboutContent } = about;

  return (
    <section className="about "> {/* Add custom class 'unique-about' */}
      <div className="row">
        <div className="column">
          <h2 className="titleText">{aboutTitle}</h2>
          <div>{aboutContent}</div>
        </div>
        <div className='column'>
          <div className='imageWrap'>
            <img src={aboutImage} alt={aboutTitle}/>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
