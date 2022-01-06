import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../layout/Loader";
import PageNotFound from "../../assets/PageNotFound";
import generateLongId from "../../assets/GenerateLong";
import { Link } from "react-router-dom";

export default function UserOrders() {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("users")) ?? null;
        } catch {
            console.error("The user could not be parsed into JSON.");
            return [];
        }
    });

    const { data: orders, loading, error } = useFetch("order");

    function renderOrder(order) {
        let totalPrice = 0; 
        
        order.products.forEach((product) => { 
            totalPrice += (product.price * product.quantity)         
        });

        let orderData = order.products.map(product => {
            return (
                <li key={generateLongId()} className="orders__order__items--item">
                    <Link to={`/products/${product.id}`}>
                        <div>
                            <img src={`/images/${product.image}`} alt={product.alt}/>
                        </div>
                        <div>
                            <p>{product.name}</p>
                            <p>$ {product.price}</p>
                            <p>Qty: {product.quantity}</p>
                        </div>
                    </Link>
                </li>
            );
        });

        return (
            <div className="orders__order">
                <div className="table--horizontal">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Order Id</th>
                                <th>Order Items</th>
                                <th>Total Price</th>
                                <th>Order Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{order.id}</td>
                                <td>{order.products.length}</td>
                                <td>$ {totalPrice}</td>
                                <td>Paid</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p className="orders__order--title">Ordered products</p>
                <ul className="orders__order__items">
                    {orderData}
                </ul>
            </div>
        );
    }

    if (error) throw error; 
    if (loading) return <Loader/>
    if (orders.length === 0) return <PageNotFound content="Couldn't find any orders." />;

    const filtered = orders.filter((id) => id.buyerId === user).map(renderOrder);
    const filteredRender = filtered.length === 0 ? "" : filtered;

    return (<>
        <h2>{filtered.length === 0 ? "No orders found." : `Found ${filtered.length} ${filtered.length === 1 ? "order" :  "orders"}`}</h2>
        <p>You must be logged in when placing an order to save the order details.</p>
        <section className="orders">
            {filteredRender}  
        </section>
    </>);
}