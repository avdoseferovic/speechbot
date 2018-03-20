import React from 'react';
import './FooterNav.css';

const FooterNav = () => {

    return(
        <footer className="footer-black">
        <div className="container">
            <div className="row">
                <nav className="footer-nav">
                    <ul>
                    </ul>
                </nav>
                <div className="credits ml-auto w-100 justify-content-center">
                    <span className="copyright" >
                        <p id="foot"> copyright © Avdo </p>
                    </span>
                    <span className="copyright">
                    <div id="copy">
                        © 2018, made with <i className="fa fa-heart heart"></i> by <a href="https://www.creative-tim.com"> Creative Tim </a>
                    </div>
                    </span>
                </div>
            </div>
        </div>
        </footer>
        );
}

export default FooterNav;