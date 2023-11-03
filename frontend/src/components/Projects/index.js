import { useState } from 'react';
import './index.scss';
import Loader from 'react-loaders';
import Sidebar from '../Sidebar';
import AnimatedLetters from '../AnimatedLetters';
import Lunchbox from '../../assets/images/lunchbox.jpg'

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
                    <p>My Kids' Lunchbox is a dynamic web application created to help families manage what foods they put into children's lunchboxes. 
                    Many families find it challenging to continuously pack lunches that their child will eat at school.  <br/> 
                    
                    <br/>Many parents feel frustrated 
                    when they open their child's lunchbox in the evening only to discover that only a few bites were taken out of a couple of items. 
                    With lunch periods being the main time of day for children to socialize, many are distracted and either forget to eat or are not
                    excited enough about the items in their lunchbox to stop talking long enough to eat. <br/>
                    
                    <br/>My Kids' Lunchbox is meant to
                    be a place where families can share ideas for meals that are nutritious, convenient, and that kids want to eat.</p>    
                    </div>
                </div>
            </div>
            <Loader type='pacman' />
        </>
    )
}

export default Projects;