import React from 'react';

const Footer = () => {
    
    const year = new Date().getFullYear();
      
    return (
        <footer>{`Copyright © ${year} | Created with love by Danielle Arnett `}</footer>
    )    
}

export default Footer;