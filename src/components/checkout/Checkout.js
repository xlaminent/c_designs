import React, { useState } from "react";
import { saveOrder } from "./CheckoutService";

const STATUS = {
    START: "START",
    SUBMITTED: "SUBMITTED",
    SUBMITTING: "SUBMITTING",
    CONFIRMED: "CONFIRMED",
};

const emptyOrder = {
    name: "",
    number: "",
    email: "",
    address: "",
    city: "",
    country: "",
    card: "",
    security: "",
    expiration: "",
    products: null,
    buyerId: "",
};

export default function Checkout({ cart, emptyCart }) {
    const [order, setOrder] = useState(emptyOrder);
    const [status, setStatus] = useState(STATUS.START);
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState({});
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("users")) ?? null;
        } catch {
            console.error("Could not get user.");
            return [];
        }
    });

    const errors = getErrors(order);
    const isValid = Object.keys(errors).length === 0;

    emptyOrder.products = cart;
    emptyOrder.buyerId = user;

    function handleChange(event) {
        event.persist(); 
        setOrder((currentAddress) => {
            return {
                ...currentAddress, [event.target.id] : event.target.value,
            }
        })
    }

    function handleBlur(event) {
        setTouched((current) => {
            return {...current, [event.target.id] : true}
        });
    }

    async function handleSubmit(event) {
      event.preventDefault(); 
      setStatus(status.SUBMITTING);

      if (isValid) {
          try {
              await saveOrder(order);
              emptyCart();
              setStatus(STATUS.CONFIRMED);
          } catch (event) {
              setError(event);
          }
      } else {
          setStatus(STATUS.SUBMITTED)
      }
    }

    function getErrors(order) {
        const result = {};

        if (!order.name) result.name = "Full name is required.";
        if (!order.number) result.number = "Phone number is required.";
        if (!order.email) result.email = "Email is required.";
        if (!order.address) result.address = "Address is required.";
        if (!order.city) result.city = "City is required.";
        if (!order.country) result.country = "Country is required.";
        if (!order.card) result.card = "Card number is required.";
        if (!order.security) result.security = "Security code is required.";
        if (!order.expiration) result.expiration = "Expiration year is required.";

        return result;
    }

    if (error) throw error;

    return (
        <section className="form">
        {status === STATUS.CONFIRMED ? (<>
            <h1>Order sent!</h1>
            <p>Thank you for placing an order with us! You will receive confirmation email within 5-10 minutes. Contact us if you need help with anything.</p>
            </>) : ( <>
            <h1>Checkout</h1>
            <form onSubmit={handleSubmit}>
                <div className="form__container">
                    <div className="form__part">
                        <h2>Customer Information</h2>
                        <div className="form__part__fields">
                            <div>
                                <label htmlFor="name">Full Name <span title="Required field">*</span></label>
                                <input id="name" type="text" maxLength="30" defaultValue={order.name} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.name || status === STATUS.SUBMITTED) && errors.name}</p>
                            </div>

                            <div>
                                <label htmlFor="number">Phone Number <span title="Required field">*</span></label>
                                <input id="number" type="text" maxLength="12" defaultValue={order.number} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.number || status === STATUS.SUBMITTED) && errors.number}</p>
                            </div>

                            <div>
                                <label htmlFor="email">Email <span title="Required field">*</span></label>
                                <input id="email" type="email" defaultValue={order.email} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.email || status === STATUS.SUBMITTED) && errors.email}</p>
                            </div>
                        </div>

                        <h2>Shipping Information</h2>
                        <div className="form__part__fields">
                            <div>
                                <label htmlFor="address">Address <span title="Required field">*</span></label>
                                <input id="address" type="text" maxLength="40" defaultValue={order.address} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.address || status === STATUS.SUBMITTED) && errors.address}</p>
                            </div>
                    
                            <div className="form__part__fields--split">
                                <label htmlFor="country">Country <span title="Required field">*</span></label>
                                <select id="country" defaultValue={order.country} onBlur={handleBlur} onChange={handleChange}>
                                    <option value="">Select Country</option>
                                    <option value="Norway">Norway</option>
                                    <option value="India">India</option>
                                    <option value="Japan">Japan</option>
                                    <option value="France">France</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                    <option value="USA">USA</option>
                                </select>
                                <p>{(touched.country || status === STATUS.SUBMITTED) && errors.country}</p>
                            </div>

                            <div className="form__part__fields--split">
                                <label htmlFor="city">City <span title="Required field">*</span></label>
                                <input id="city" type="text" maxLength="20" defaultValue={order.city} onBlur={handleBlur} onChange={handleChange}/>
                                <p>{(touched.city || status === STATUS.SUBMITTED) && errors.city}</p>
                            </div>
                        </div>
                    </div>
                    <div className="form__part">
                        <h2>Payment Information</h2>

                        <div className="form__part__fields">
                            <div>
                                <label htmlFor="card">Card Number <span title="Required field">*</span></label>
                                <input id="card" type="text" maxLength="12" defaultValue={order.card} placeholder="xxx-xxx-xxx-xxx" onBlur={handleBlur} onChange={handleChange}/>
                                <p >{(touched.card || status === STATUS.SUBMITTED) && errors.card}</p>
                            </div>

                            <div className="form__part__fields--split">
                            <label htmlFor="security">Security Code <span title="Required field">*</span></label>
                                <input id="security" type="text" maxLength="3" defaultValue={order.security} placeholder="xxx" onBlur={handleBlur} onChange={handleChange}/>
                                <p >{(touched.security || status === STATUS.SUBMITTED) && errors.security}</p>
                            </div>

                            <div className="form__part__fields--split">
                            <label htmlFor="expiration">Expiration Year <span title="Required field">*</span></label>
                                <input id="expiration" type="text" maxLength="4" defaultValue={order.expiration} placeholder="yyyy" onBlur={handleBlur} onChange={handleChange}/>
                                <p >{(touched.expiration || status === STATUS.SUBMITTED) && errors.expiration}</p>
                            </div>
                        </div>

                        <div className="form__end">
                            <button disabled={status === STATUS.SUBMITTING} className="button button__primary" title="Complete the order">Place Order</button>
                        </div>
                    </div>

                    <input type="hidden" id="items" value={order.products}/>
                    <input type="hidden" id="user_token" value={order.buyerId}/>
                </div>
            </form>
        </>)}
        </section>
    );
}
