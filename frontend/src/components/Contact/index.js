import { useState, useRef } from 'react';
import './index.scss';
import Sidebar from '../Sidebar';
import Loader from 'react-loaders';
import AnimatedLetters from '../AnimatedLetters';
import emailjs from '@emailjs/browser';


const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs.sendForm('service_xjawnab', 'template_sqdxi7o', form.current,'1L6jekCuzkViH9D5K')
            .then (
                () => {
                    alert('Message successfully sent!')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the message.  Please try again.')
                }
            )
    }

    return (
            <>
                <div className="container contact-page">
                    <Sidebar />
                    <form ref={form} onSubmit={sendEmail} className="contact-form">
                            <input 
                                type="text"
                                name="name"
                                placeholder="Name"
                                required/><br />
                            <input
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                required/><br />
                            <input
                                type="text"
                                name="subject"
                                placeholder="Subject"
                                required/><br />
                            <textarea
                                name="message"
                                placeholder="Message"
                                required/>
                            <input className="flat-button"
                                type="submit"
                                name="submit"
                                value="Submit"/>
                        </form>
                        
                    <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                        letterClass={letterClass}
                        strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'M', 'e', ' ', ':']}
                        idx={15}
                        />
                    </h1>
                    <p>
                        I am available for freelance projects and collaborative opportunities.<br/> 
                        If you would like to work together, or simply talk tech, please reach <br/>
                        out using the form to the right  ----->
                    </p>         
                </div>
                
            </div>
            <Loader type='pacman' />
        </>
    )  
}

export default Contact;

{/* <div className="contact-form">
<form>
    <input 
        className="half" 
        placeholder="Name" 
        type="text" name="name" 
        required>
    </input>
    <input
        className="half"
        placeholder="Email"
        type="email"
        name="email"
        required>
    </input>
    <input
        placeholder="Subject"
        type="text"
        name="subject"
        required>
    </input>
    <textarea
        placeholder="Message"
        name="message"
        required>
    </textarea>
    <input type="submit" className="flat-button" value="SEND" ></input>
</form>
</div> */}