import React, { useState, useReducer, useEffect } from "react";
import "./sass/style.scss";
import Footer from "./components/layout/Footer";
import { Routes, Route } from "react-router-dom";
import { AccessProvider } from "./context/AccessContext";
import Home from "./components/home/Home";
import Header from "./components/layout/Header";
import Products from "./components/products/Products";
import ProductDetails from "./components/products/ProductDetail";
import FavouriteList from "./components/favourites/FavouriteList";
import Register from "./components/account/Register";
import AccountPage from "./components/account/AccountPage";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";

export default function App() {
    const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch {
      console.error("The cart could not be parsed into JSON.");
      return [];
    }
  });
  
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

  function addToCart (id, sku, image, name, price, alt) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        return items.map((i) => i.sku === sku ? { ...i, quantity: i.quantity + 1} : i );
      } else { 
          return [...items, { id : id, sku : sku, quantity: 1, image : image, name : name, price : price, alt : alt}];
      }
    });
  }

  function changeQuantity(sku, quantity) {
    setCart((items) => {
      if (quantity === 0) {
        return items.filter((i) => i.sku !== sku)
      }
      return items.map((i) => i.sku === sku ? { ...i, quantity : quantity} : i)
    })
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <AccessProvider>
        <Header />
        <main className="container">
            <section className="container__content">
                <Routes>
                    <Route path="/" exact element={<Home/>}></Route>
                    <Route path="/:category" element={<Products/>}></Route>
                    <Route path="/:category/:id" element={<ProductDetails addToCart={addToCart}/>}></Route>
                    <Route path="/cart" element={<Cart cart={cart} changeQuantity={changeQuantity}/>}></Route>
                    <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart}/>}></Route>
                    <Route path="/favourites" element={<FavouriteList/>}></Route>
                    <Route path="/register" element={<Register/>}></Route>
                    <Route path="/account" element={<AccountPage/>}></Route>
                </Routes>
            </section>
        </main>
    <Footer />
    </AccessProvider>
  );
}
