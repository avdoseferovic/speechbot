import React from 'react';
//import './HeroImage.css';
const Footer = () => {

    return(
        <footer className="footer">
        <div className="container">
            <div className="row">
                <nav className="footer-nav w-100 justify-content-center">
                    <ul style={{textAlign: 'center'}}>
                        <li><a href="https://www.creative-tim.com" target="_blank" rel="noopener noreferrer">Creative Tim</a></li>
                        <li><a href="https://blog.creative-tim.com" target="_blank" rel="noopener noreferrer">Blog</a></li>
                        <li><a href="https://www.creative-tim.com/license" target="_blank" rel="noopener noreferrer">Licenses</a></li>
                    </ul>
                </nav>
            </div>
        </div>
        </footer>
        );
}

export default Footer;