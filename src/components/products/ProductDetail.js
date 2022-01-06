import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../layout/Loader";
import PageNotFound from "../../assets/PageNotFound";

export default function Detail(props) {
    const {id} = useParams();
    const navigate = useNavigate();
    const [sku, setSku] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const { data: product, loading, error} = useFetch(`products/${id}`);

    if (loading) return <Loader/>;
    if (!product) return <PageNotFound content="Product not found."/>
    if (error) throw error;

    function changeProductImg(img) {
        const shownImg = document.querySelector('.productImg');
        shownImg.src = img.currentTarget.src;
    }
  
    const handleReviewTab = () => {
        setActiveTab("review");
      };

    const handleShippingTab = () => {
        setActiveTab("shipping");
    };

    return (
      <>
        <section id="product" className="product" >
            <div className="product__container">
                <div className="product__container__split product__container__split--left">	
                    <div className="gallery">
                        <img src={`/images/${product.image}`} alt={product.alt} className="productImg"/>
                    </div>
                    <div className="thumbnails">
                        <img src={`/images/${product.image}`} alt={product.alt} title="Zoom" onClick={changeProductImg}/>
                        <img src="/images/placeholder.png" title="Zoom" alt="Handmade brown and white pillowcover" onClick={changeProductImg}/>
                        <img src="/images/placeholder2.png" title="Zoom" alt="Handmade brown and white pillowcover" onClick={changeProductImg}/>
                        <img src="/images/placeholder.png" title="Zoom" alt="Closeup of brown and white pillowcover" onClick={changeProductImg}/>
                    </div>  
                    <div className="brand hidden-md show-lg">
                        <p>about the artisan</p>
                        <h2>Company Name</h2>
                        <p>This is a long description that describes the company/brand/creator of this product.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non aliquet nibh. 
                            Morbi eleifend quam libero, vitae venenatis odio rutrum vel. Aenean euismod pharetra ex, et luctus ligula ornare eu.</p>
                        <button className="button button__secondary">Read More</button> 
                    </div>
                </div>

                <div className="product__container__split product__container__split--right">
                    <div className="info__section">
                        <h1>{product.name}</h1>
                        <h2>{product.tagline}</h2>
                        <h3>$ {product.price}</h3>
                        <p>{product.description}</p>  
                        <p>{product.long__description}</p>

                        <p className="info__section--order">Pick the color</p>
                        <select className="info__section--select" value={sku} onChange={(event) => setSku(event.target.value)}>
                            <option value="">..</option>
                            { product.skus.map((s) => (
                                <option key={s.sku} value={s.sku}>{s.color}</option>
                            ))}
                        </select>
                        <button className="button button__primary" disabled={!sku} onClick={() => {props.addToCart(id, sku, product.image, product.name, product.price, product.alt); navigate("/cart");}}>Add To Cart</button> 

                        <div className="info__section__accordion">
                            <div className="tab">
                                <h4 title="Open Tab">Details</h4>
                                <div id="tab1" className="tab__wall">
                                    <ul>
                                        <li><p>Measurements: <span>25cm x 45cm x 2-20cm </span></p> </li>
                                        <li><p>Care: <span>Handwash Only</span></p> </li>
                                        <li><p>Colors: <span>Eggwhite and Light Brown </span></p></li>
                                        <li><p>Storage: <span>Cool, dry place </span></p></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="tab">
                                <h4 onClick={handleReviewTab} title="See reviews" className="pointer">Reviews<span className="material-icons tab__arrows">keyboard_arrow_down</span></h4>
                                <div id="tab2" className={`hide tab__wall ${activeTab === "review" ? "show" : ""}`}>
                                    <p className="bottomless">No reviews yet - Be the first</p>
                                </div>
                            </div> 
                            <div className="tab">
                                <h4 onClick={handleShippingTab} title="See shipping information" className="pointer">Shipping & Returns<span className="material-icons tab__arrows">keyboard_arrow_down</span></h4>
                                <div id="tab3" className={`hide tab__wall ${activeTab === "shipping" ? "show" : ""}`}>
                                    <p className="tab__wall__heading">Shipping</p>
                                    <p>Morbi sed nisl rhoncus turpis pellentesque dignissim facilisis et sem. Aliquam mattis porttitor nulla non luctus.  Aliquam fermentum, arcu sed tempus dictum, nulla enim aliquam</p>
                                    <p className="tab__wall__heading">Returns</p>
                                    <p className="bottomless">Integer ut felis ullamcorper, auctor risus et, hendrerit arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce tincidunt neque vel arcu mollis gravida. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="brand show-md">
                        <p>about the artisan</p>
                        <h2>Company Name</h2>
                        <p>This is a long description that describes the company/brand/creator of this product.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non aliquet nibh. 
                            Morbi eleifend quam libero, vitae venenatis odio rutrum vel. Aenean euismod pharetra ex, et luctus ligula ornare eu.</p>
                        <button className="button button__secondary">Read More</button> 
                    </div>
                </div>
            </div>
        </section>
    </>);
}
