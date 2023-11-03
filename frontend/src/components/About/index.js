import { useState, useEffect } from 'react';
import './index.scss'
import AnimatedLetters from '../AnimatedLetters';
import Loader from 'react-loaders';
import Sidebar from '../Sidebar';
import Headshot from '../../assets/images/older_headshot.jpeg';


const About = () => {
    const [letterClass, setLetterClass] = useState('text-animate')

    return (
        <>
        <div className='container about-page'>
            <Sidebar />
            <div className='img'>
                <img className='Headshot' src={Headshot} />
                <br/><br/><br/><br/>
                <text className='interests'>
                    TECH SKILLS:<br/>
                    <br/>        
                    HTML,    CSS,    JavaScript,  
                    <br/>
                    NodeJS,    ExpressJS,    ReactJS, 
                    <br/>
                    Python,    Flask,    SQLAlchemy,  
                    <br/>
                    Jinja Templates,    PostgreSQL, 
                    <br/>
                    Pytest,   Jest,    Jasmine <br/> <br/>
                    INTERESTS: <br/><br/>
                    Singing,  Piano,  Knit/Crochet,
                    <br/>
                    Hiking, Movies, Working Out
                </text>
            </div>
            <div className='text-zone'>
                <h1>
                    <AnimatedLetters
                        letterClass = {letterClass}
                        strArray={['A', 'b', 'o', 'u', 't', ' ', 'M', 'e', ' ', ':']}
                        idx={15}
                    />
                </h1>
               
                <p className='thank-you'>Thank you for visiting!</p>
                <p>I am a software developer with a passion for creating applications that are visually appealing and beneficial 
                   to people of all ages and walks of life.
                </p>
                <p>Previously, I was a successful early childhood and family educator for over 15 years, working in both
                   classrooms and studio settings.  It is during this time that I developed many important skills, including, stellar
                   verbal and written communication, active listening, conflict resolution, time management, prioritization, and general
                   professionalism.  It is also during my career as a teacher where I honed my ability to reflect upon my learning 
                   process, which has been invaluable since taking on the complex and challenging task of transitioning into the 
                   technology sector.
                </p>
                <p>I am seeking opportunities to collaborate with other talented developers to create innovative, 
                   attractive, and engaging applications for everyone.  
                </p>
                <br/>
            </div>  
        </div>
        <Loader type="pacman"/>
        </>
    )
}

export default About;