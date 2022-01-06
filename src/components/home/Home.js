import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <section className="home">
            <p className="home__heading">Fall is all about <span>warm and intimate</span> pieces </p>
            <section className="carousel">
                <div className="carousel__inner">
                    <div className="carousel__inner__item">
                        <div>
                        {/* <!-- Image from Ylanite Koppens fra Pexels --> */}
                            <img alt="two white pots" src="/images/pexels-ylanite-koppens-1445419.jpg"/>
                        </div>
                        <div className="carousel__inner__item--caption">
                            <h2>Still</h2>
                            <p>$ 94.95</p>
                            <button className="button button__secondary" onClick={() => navigate(`/products/1`)} title="Continue to product page">Continue</button>
                        </div>
                    </div>
                    <div className="carousel__inner__item">
                        <div>
                        {/* <!-- Image from Ylanite Koppens fra Pexels --> */}
                            <img alt="three white pots" src="/images/pexels-ylanite-koppens-776656.jpg"/>
                        </div>
                        <div className="carousel__inner__item--caption">
                            <h2>LuUpes Highrise, 3</h2>
                            <p>$ 145.95</p>
                            <button className="button button__secondary" onClick={() => navigate(`/products/3`)} title="Continue to product page">Continue</button>
                        </div>
                    </div>
                    <div className="carousel__inner__item">
                        <div>
                        {/* <!-- Image from Ylanite Koppens fra Pexels --> */}
                            <img alt="two white pots" src="/images/pexels-ylanite-koppens-796620.jpg"/>
                        </div>
                        <div className="carousel__inner__item--caption">
                            <h2>uUpes Highrise, 2</h2>
                            <p>$ 78.99</p>
                            <button className="button button__secondary" onClick={() => navigate(`/products/2`)} title="Continue to product page">Continue</button>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="highlight">
                <p className="home__heading">This Fall's <span>Highlighted</span> Artists</p>
                <div className="highlight__container highlight__text">
                    <div>
                        <h1>The Pattern Mill</h1>
                        <p>An all-women-business based in Lima, Peru. Handmade materials 
                        (wool, yarn, thread) and masterly crafted textile-products based upon old patterns. The Pattern Mill makes blankets, quilts, covers and throw pillows.
                        </p>
                        <button type="button" className="button button__primary" title="Products from this artist">More</button>
                    </div>
                </div>
                <div className="highlight__container highlight__img">
                    {/* Photo by 🇸🇮 Janko Ferlič on Unsplash */}
                    <img src="/images/janko-ferlic-eBtwD6ZG78I-unsplash.jpg" alt="Wall of threads" />
                </div>
            </section>
        </section>
    );
}
