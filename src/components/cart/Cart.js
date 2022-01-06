import React from "react";
import useFetchAll from "../../hooks/useFetchAll";
import Loader from "../layout/Loader";
import Checkout from "../checkout/Checkout";
import generateLongId from "../../assets/GenerateLong";
import { useNavigate, Link } from "react-router-dom";

export default function Cart(props) {
    const navigate = useNavigate();
    const { cart, changeQuantity } = props;
    const urls = cart.map((i) => `products/${i.id}`);
    const { data: products, loading, error } = useFetchAll(urls);

    function renderItem(itemInCart) {
        const { id, sku, quantity } = itemInCart;
        const { price, name, alt, image, skus } = products.find((p) => p.id === parseInt(id));
        const { color } = skus.find((s) => s.sku === sku);

        return (
            <div className="cart__items__card" key={generateLongId()}>
                <div className="cart__items__card--img"><img src={`/images/${image}`} alt={alt} /></div>
                <div className="cart__items__card--details">
                    <h3 className="text-uppercase">{name}</h3>
                    <p>Color: {color}</p>
                    <p>${price}</p>
                    <p>Update Quantity</p>                        
                    <select onChange={(e) => changeQuantity(sku, parseInt(e.target.value))} value={quantity}>
                            <option value="0">Remove</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                    </select>
                </div>
            </div>
        );
    }

    function renderCartSum(itemInCart) {
      const { id, quantity } = itemInCart;
      const { price, name} = products.find((p) => p.id === parseInt(id));

      return (
          <li className="cart__summary__table--item" key={generateLongId()}>
              <p>{name} (<b>{quantity}</b>)</p>
              <p>${price}</p>
          </li>
      );
  }

    if (loading) return <Loader />;
    if (error) throw error;

    const inCart = cart.reduce((total, item) => total + item.quantity, 0);

    let totalPrice = 0;
    
    if (inCart > 0 ) {
        products.forEach((product) => { 
            const cartItem = cart.find(i => +i.id === product.id);

            if (cartItem) {
              totalPrice += cartItem.quantity * product.price;
            }
        });
    }  

    return (
        <section className="cart">
            <h1>Your Cart <span>{inCart === 0 ? " The cart is empty." : `${inCart} Item${inCart > 1 ? "s" : ""}`}</span></h1>
            {inCart > 0 ? <div className="cart__overview">
                <div className="cart__overview--items">
                    <div className="cart__items">{cart.map(renderItem)}</div>
                </div>

                <div className="cart__summary">
                    <h2>Cart</h2>
                    <p>{inCart}<span className="material-icons">shopping_basket</span></p>
                    <ul className="cart__summary__table">
                        {cart.map(renderCartSum)}
                    </ul>
                    {inCart > 0 && <p className="cart__summary__end">Total price: <span>${totalPrice.toFixed(2)}</span></p>}
                    {inCart > 0 && <button disabled={!inCart} className="button button__primary" title="Continue to Checkout" onClick={() => navigate("/checkout")}>To Checkout</button>}
                </div>
            </div> : "" }
        </section> 
    );
}