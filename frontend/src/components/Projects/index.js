import { useState } from 'react';
import './index.scss';
import Loader from 'react-loaders';
import Sidebar from '../Sidebar';
import AnimatedLetters from '../AnimatedLetters';
import Lunchbox from '../../assets/images/lunchbox.jpg';
import GoldenRetriever from '../../assets/images/golden_retriever.png';
import THDLogo from '../../assets/images/medium-transparent-logo.png';

const Projects = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    
    return (
        <>
            <div className='container projects-page'>
                <Sidebar />
                <div className='text-zone'>
                    <h1>
                        <AnimatedLetters 
                            letterClass={letterClass}
                            strArray={["M","y", " ", "P", "r", "o", "j", "e", "c", "t", "s", " ", ":"]}
                            idx={15}
                        />
                    </h1>  
                    <div className='MKL'>
                        <a href='https://my-kids-lunchbox.onrender.com'><img className='lunchbox' src={Lunchbox} /></a>
                            <br/><br/><br/>
                        <a href='https://my-kids-lunchbox.onrender.com'><p className='MKL-title'>My Kids' Lunchbox</p></a>
                        <text className='technologies'> 
                                <ul>
                                    <li>JavaScript</li>
                                    <li>CSS</li>
                                    <li>Node.JS</li>
                                    <li>Express.JS</li>
                                    <li>React.JS</li>
                                    <li>PostgreSQL</li>
                                </ul> 
                        </text>
                        <p>My Kids' Lunchbox is a dynamic web application created to help families manage what foods they put into children's lunchboxes.</p> 
                    </div>

                    <br /><br /><br/>

                    <div className='puppy-match'>
                        <a href='https://deregan54.github.io/Memory-Game/'><img className='goldenRetriever' src={GoldenRetriever} /></a>
                        <a href='https://deregan54.github.io/Memory-Game/'><p className='puppyMatch-title'>Puppy Match</p></a>
                        <text className='technologies'> 
                            <ul>
                                <li>HTML</li> 
                                <li>CSS</li>
                                <li>JavaScript</li>
                            </ul> 
                        </text>
                        <p>Puppy Match is a basic memory-match game.
                        This is the very first application I created, back in September of 2022.  
                        As you can see, I've come a long way since then! 
                        </p> 
                   </div>

                   <br/><br/><br/>

                    <div className='THD'>
                        <img className='THDLogo' src={THDLogo}></img>
                        <a><p className='THD-title'>The Blog</p></a>
                        <text className='technologies'> 
                            <ul>
                                <li>JavaScript</li>
                                <li>Node.JS</li>
                                <li>Express.JS</li>
                                <li>React.JS</li>
                                <li>MaterialUI</li>
                                <li>PostgreSQL</li>
                            </ul> 
                        </text>
                        <p>Coming Soon! 
                            <br/><br/>
                           The Humble Developer's Blog will chronicle my journey into the world of software development.
                           Like most new developers, I encounter challenges and breakthroughs daily.  Through this blog, 
                           I plan on celebrating the breakthroughs and sharing my approach to tackling the challenges
                           head-on.
                        </p> 
                   </div>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default Projects;