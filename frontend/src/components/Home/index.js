import { useState } from 'react';
import LogoTitle from '../../assets/images/THD-large-transparent.png';
import LogoLaptop from '../../assets/images/logo-laptop.png'
import Headshot from '../../assets/images/Headshot.jpg'
import AnimatedLetters from '../AnimatedLetters';
import Loader from 'react-loaders';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLinkedin,
    faGithub,
    faYoutube,
    faSkype,
    faPaypal,
    faXTwitter,
    faFacebookF
} from '@fortawesome/free-brands-svg-icons'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const letterArray = [' ', ' ', 'A', ' ', 'p', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o', ' ', 'b', 'y', ' ', 'D', 'a', 'n', 'i', 'e', 'l', 'l', 'e', ' ', 'A', 'r', 'n', 'e', 't', 't']


    return (
        <>
        <div className='container home-page'>
            <Sidebar />
            <div>
                <img className='headshot'  src={Headshot} alt='Danielle' />
            </div>
            <div className='text-zone'>
                <h1>
                    <img className='laptopImg' src={LogoLaptop} alt='laptop' />
                    <br />
                    <img className='logoTitle'  src={LogoTitle} alt='Logo' />
                    <h2>Full-Stack Software Development</h2> 
                    <AnimatedLetters letterClass = {letterClass} strArray={letterArray} idx={9}/>
                </h1>
                <br />
                <div className='socials-container'>
                <div className='socials'>
                    <a
                        className='linkedIn-link'
                        target='_blank'
                        rel='noreferrer'
                        href='https://www.linkedin.com/in/daniellereganarnett/'
                    >
                        <FontAwesomeIcon icon={faLinkedin} color='#4d4d4e' />
                    </a>
                    <a
                        className='github-link'
                        target='_blank'
                        rel='noreferrer'
                        href='https://github.com/DReganArnett'
                    >
                        <FontAwesomeIcon icon={faGithub} color='#4d4d4e' />
                    </a>
                    <a
                        className='facebook-link'
                        target='_blank'
                        rel='noreferrer'
                        href='https://www.facebook.com/daniellereganarnett'
                    >
                        <FontAwesomeIcon icon={faFacebookF} color='#4d4d4e' />
                    </a>
                    {/* <a
                        className='X-link'
                        target='_blank'
                        rel='noreferrer'
                        href='https://twitter.com/DanielleA75807'
                    >
                        <FontAwesomeIcon icon={faXTwitter} color='#4d4d4e' />
                    </a> */}
                    <a
                        className='youtube-link'
                        target='_blank'
                        rel='noreferrer'
                        href='https://www.youtube.com/channel/UC8ePWt29XdwuCm0pBEwRa_w'
                    >
                        <FontAwesomeIcon icon={faYoutube} color='#4d4d4e' />
                    </a>
                    <a
                        className='paypal-link'
                        target="_blank"
                        rel="noreferrer"
                        href="https://paypal.me/DanielleArnettCO?country.x=US&locale.x=en_US"
                    >
                        <FontAwesomeIcon icon={faPaypal} color='#4d4d4e' />
                    </a>
                </div> 
                </div>   
            </div>
        </div>
        <Loader type='pacman' />
        {/* <Footer /> */}
        </>
    )
}

export default Home;