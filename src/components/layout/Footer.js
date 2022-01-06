import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__section">
                <div className="footer__section--part">
                    <p className="footer__heading">Help</p>
                    <div className="footer__content">
                        <p className="footer__detail">FAQ</p>
                        <p className="footer__detail">Site Map</p>
                        <p className="footer__detail">Accessibility</p>
                    </div>
                </div>
                <div className="footer__section--part">
                    <p className="footer__heading">Contact</p>
                    <div className="footer__content">
                        <p className="footer__detail">Backlake 43</p>
                        <p className="footer__detail">England, 5031</p>
                    </div>
                    <div className="footer__content">
                        <p className="footer__detail">cnscious.designs@mail.no</p>
                    </div> 
                </div>
                <div className="footer__section--part hidden-sm">
                    <div className="footer__section--logo">
                        <Link to="/"><img alt="Conscious Designs logo" src="/images/conscious_designs-xs.svg"/></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
