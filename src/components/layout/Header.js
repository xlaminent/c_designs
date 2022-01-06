import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import AccessContext from "../../context/AccessContext";

export default function Header() {
    const [auth, setAuth] = useContext(AccessContext);
    const [user, ] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("users")) ?? null;
        } catch {
            console.error("There was an error getting the user.");
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("users", JSON.stringify(user));
      }, [user]
    ); 

    const activeStyle = {
        color: "#874017",
    };

    function logout() {
        setAuth(null);
    }

    return (
        <>
        <header className="header">
            <div className="header__top">
                <div className="header__top__box header__top__search hidden-md">
                    <div className="header__top__search--panel">
                        <input type="text" placeholder="Search"></input>
                        <span className="material-icons pointer">search</span>
                    </div>
                </div>

                <div className="header__top__box header__top--logo">
                    <Link to="/">
                        <img alt="Conscious Designs logo" className="hidden-md" src="/images/conscious_designs-sm.svg"/>
                        <img alt="Conscious Designs logo" className="show-md" src="/images/conscious_designs-xs.svg"/>
                    </Link></div>
                <div className="header__top__box header__top--user hidden-md">
                    <ul>
                        {!auth ? (<li><NavLink activestyle={activeStyle} title="Create account" to="/register">Register</NavLink></li>) 
                        : (<>
                            <li className="pointer" title="Log out" onClick={logout}>Logout</li>
                            <li>
                                <NavLink activestyle={activeStyle} to="/account">
                                    <span className="material-icons pointer" alt="Person Outline Icon" title="Go to account">person</span>
                                </NavLink>
                            </li>
                        </>)}
                        <li>
                            <NavLink activestyle={activeStyle} to="/cart">
                                <span className="material-icons pointer" title="Your Cart" alt="Shopping Bag Outline Icon">shopping_basket</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header__nav">
                <nav>
                    <a href="javascript:void(0);" className="menu__btn"><span className="material-icons" title="Open Menu" alt="Menu Outline Icon">menu</span></a>
                    <ul className="menu menu__bar">
                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--main" to="/ceramic">NEW</NavLink></li>

                        <li><a href="javascript:void(0);" className="menu__link menu__link--main" role="menuitem" aria-haspopup="true" title="Open decor categories">Decor<i className="material-icons arrow">navigate_next</i></a>
                            <ul className="menu__mega mega-menu--flat full">
                                <li className="menu__mega__child">
                                    <NavLink activestyle={activeStyle} className="menu__link menu__mega__header" to="/ceramic">Baskets</NavLink>
                                    <ul className="menu">
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Ceramic</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Woven</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Crochet</NavLink></li>
                                    </ul>
                                </li>

                                <li className="menu__mega__child">
                                    <NavLink activestyle={activeStyle} className="menu__link menu__mega__header" to="/ceramic">Vases & Jars</NavLink>
                                    <ul className="menu">
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Ceramic</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Terracotta</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Glass</NavLink></li>
                                    </ul>
                                </li>
                                <li className="menu__mega__child">
                                {/* <!-- Photo by Jade Scarlato on Unsplash --> */}
                                    <img src="/images/jade-scarlato-ozznFZJo0Ms-unsplash.jpg" alt="Person forming clay"/>
                                    <NavLink className="menu__mega__child--link" to="/ceramic">The making of authentic terracotta pots</NavLink>
                                </li>
                                <li className="menu__back">
                                    <a href="javascript:void(0);" title="Go back" className="menu__link"><span className="material-icons">navigate_before</span> Back</a>
                                </li>
                            </ul>
                        </li>

                        <li><a href="javascript:void(0);" className="menu__link menu__link--main" role="menuitem" aria-haspopup="true" title="Open fabric categories">Fabric & Textiles<i className="material-icons arrow">navigate_next</i></a>
                            <ul className="menu__mega mega-menu--flat full">
                                <li className="menu__mega__child">
                                    <NavLink activestyle={activeStyle} className="menu__link menu__mega__header" to="/ceramic">Throws & Blankets</NavLink>
                                    <ul className="menu">
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Throws</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Blankets</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Quilts</NavLink></li>
                                    </ul>
                                </li>

                                <li className="menu__mega__child">
                                    <NavLink activestyle={activeStyle} className="menu__link menu__mega__header" to="/ceramic">Pillows</NavLink>
                                    <ul className="menu">
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Pillowcases</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Pillows</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Throw Pillows</NavLink></li>
                                    </ul>
                                </li>
                                <li className="menu__mega__child">
                                {/* <!-- Photo by squazimo on Pixabay --> */}
                                    <img src="/images/rugs-641303_640.jpg" alt="Traditional red rugs"/>
                                    <NavLink className="menu__mega__child--link" to="/ceramic">How traditional Chilean rugs are made</NavLink>
                                </li>
                                <li className="menu__back">
                                    <a href="javascript:void(0);" title="Go back" className="menu__link"><span className="material-icons">navigate_before</span> Back</a>
                                </li>
                            </ul>
                        </li>

                        <li><a href="javascript:void(0);" className="menu__link menu__link--main" role="menuitem" aria-haspopup="true" title="Open furniture categories">Furniture<i className="material-icons arrow">navigate_next</i></a>
                            <ul className="menu__mega mega-menu--flat full">
                                <li className="menu__mega__child">
                                    <NavLink activestyle={activeStyle} className="menu__link menu__mega__header" to="/ceramic">Chairs</NavLink>
                                    <ul className="menu">
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Leather</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Wood</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Woven</NavLink></li>
                                    </ul>
                                </li>

                                <li className="menu__mega__child">
                                    <NavLink activestyle={activeStyle} className="menu__link menu__mega__header" to="/ceramic">Shelves</NavLink>
                                    <ul className="menu">
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Glass</NavLink></li>
                                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--sub" to="/ceramic">Wood</NavLink></li>
                                    </ul>
                                </li>
                                <li className="menu__mega__child">
                                {/* <!-- Photo by Karolina Grabowska on Pexels --> */}
                                    <img src="/images/pexels-karolina-grabowska-4210805.jpg" alt="Foldable brown chair"/>
                                    <NavLink className="menu__mega__child--link" to="/ceramic">Sustainability with Chichipate-wood</NavLink>
                                </li>
                                <li className="menu__back">
                                    <a href="javascript:void(0);" title="Go back" className="menu__link"><span className="material-icons">navigate_before</span> Back</a>
                                </li>
                            </ul>
                        </li>

                        <li><NavLink activestyle={activeStyle} className="menu__link menu__link--main" to="/ceramic">Sale</NavLink></li>

                        <li className="menu__header">
                            <NavLink to="/"><span>Menu</span></NavLink>
                            <div className="menu__header__user">                                
                                {!auth ? (<NavLink activestyle={activeStyle} className="menu__header__user--nav" to="/register">Register</NavLink>) 
                                : (<>
                                    <NavLink activestyle={activeStyle} to="/account"><span className="material-icons pointer" alt="Person Outline Icon" title="Go to account">person</span></NavLink>
                                    <span className="material-icons pointer" title="Logout" onClick={logout}>logout</span>
                                </>)}
                                <NavLink activestyle={activeStyle} to="/cart">
                                    <span className="material-icons pointer" title="Your Cart" alt="Shopping Bag Outline Icon">shopping_basket</span>
                                </NavLink>
                            </div>
                        </li>
                        <li className="menu__footer">
                            <div className="menu__footer__search search-panel">
                                <span className="material-icons">search</span>
                                <input className="menu__footer__search--input" name="search" type="search" placeholder="Search..." />
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        </>
    );
}