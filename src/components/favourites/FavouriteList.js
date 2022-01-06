import { useState } from "react";
import { Link } from "react-router-dom";

export default function FavouriteList() {
    const [fav,] = useState(() => {
		try {
		  return JSON.parse(localStorage.getItem("favourites")) ?? [];
		} catch {
		  console.error("Couldn't find any favorites.");
		  return [];
		} 
	});
    
    if (fav === null) {return [];} 
    
	return (<>
        {fav >= 0 ? (<><h2>No favourites found</h2><p>You don't have any favourites yet.</p></>) : 
        (<><h2>Found {fav.length} {fav.length === 1 ? "favorited item" :  "favorite items"}</h2></>)}
        <ul className="cards">
            {fav.map((item) => {
                return (
                    <li key={item.id} className="cards__item">
                        <Link to={`/products/${item.id}`}>
                            <div className="cards__item__img">
                                <img src={`/images/${item.product_image}`} alt={item.product_alt} />
                            </div>
                            <h4 className="cards__item__title">{item.product_name}</h4>
                            <p className="cards__item__desc">$ {item.product_price}</p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    </>);
}