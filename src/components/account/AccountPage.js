import { useState, useContext } from "react";
import FavouriteList from "../../components/favourites/FavouriteList";
import UserOrders from "./Orders";
import AccessContext from "../../context/AccessContext";

export default function AccountPage() {
    const [auth,] = useContext(AccessContext);
    const [activeTab, setActiveTab] = useState("tabs__nav__li--first");

    const handleTab1 = () => {
        setActiveTab("tabs__nav__li--first");
    };

    const handleTab2 = () => {
        setActiveTab("tabs__nav__li--second");
    };

    return (
        <section className="account">
        {!auth ? (<><h1>No Access</h1><p>Login to get access to your account.</p></>) : (<>
            <h1>Your Account</h1>
            <p>See past orders, manage information and save your favourite items for later.</p>

            <div className="tabs">
                <ul className="tabs__nav">
                    <li className={`tabs__nav__li pointer ${activeTab === "tabs__nav__li--first" ? "active" : ""}`} onClick={handleTab1}>Order Details</li>
                    <li className={`tabs__nav__li pointer ${activeTab === "tabs__nav__li--second" ? "active" : ""}`} onClick={handleTab2}>Favourites</li>
                    <li className="tabs__nav__li">Account Information</li>
                    <li className="tabs__nav__li">Discounts & Codes</li>
                </ul>
                <div className="tabs__content">
                    {activeTab === "tabs__nav__li--first" ? <UserOrders/> : <FavouriteList/>}
                </div>
            </div>
        </>)}
        </section>
    );
}