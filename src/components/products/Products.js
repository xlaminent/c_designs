import { useState, useEffect, useContext } from "react";
import Loader from "../layout/Loader";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import PageNotFound from "../../assets/PageNotFound";
import { Link } from "react-router-dom";
import AccessContext from "../../context/AccessContext";

export default function Products() {
    const [types, setType] = useState(""); 
    const [clicked, setClicked] = useState(false);
    const {category} = useParams();
    const [auth,] = useContext(AccessContext);

    const [fav, setFav] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("favourites")) ?? [];
        } catch {
            console.error("The favourite could not be parsed into JSON.");
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(fav));
      }, [fav]
    );

    function addToFavourites({id, name, price, image, alt}) {
        setFav((favs) => {
            const favourited = favs.find((post) => post.id === id);

            if (!favourited) {
              return [...favs, { id : id, product_name : name, product_price : price, product_image : image, product__alt : alt}];
            } else {
              return favs;
            }
        });
    }

    function removeFav({id}) {
        setFav((favs) => {
            const favouritedIndex = favs.findIndex((favourite) => favourite.id === id);

            if (favouritedIndex >= 0) {
              favs.splice(favouritedIndex, 1);
            }

            return [ ...favs ];
        }); 
    }

    const { data: products, loading, error } = useFetch(
        "products?category=" + category
    );

    function openFilterMenu() {
        setClicked(!clicked);
    }

    function renderProduct(p) {
        const isFavourited = fav.findIndex((favourite) => favourite.id === p.id) >= 0;
        const favBtnHandler = isFavourited ? (p) => removeFav(p) : (p) => addToFavourites(p);
        const favTextState = isFavourited ? "favorite" : "favorite_border";
        const favTitleState = isFavourited ? "Add favourite" : "Remove favourite";
        const favClassState = isFavourited ? "btn-add" : "btn-remove";

        return (
            <li key={p.id} className="cards__item">
                <Link to={`/${category}/${p.id}`}>
                    <div className="cards__item__img">
                        <img src={`/images/${p.image}`} alt={p.alt}/>
                    </div>
                    <h4 className="cards__item__title">{p.name}</h4>
                    <p className="cards__item__desc">${p.price}</p>
                </Link>
                {!auth ?  
                    (<span className={`material-icons cards__item__fav cards__item__tooltip ${favClassState}`}>{favTextState}<span className="cards__item__tooltip--text">Login to add favourites</span></span>) 
                    : 
                    (<span title={favTitleState} className={`material-icons cards__item__fav pointer ${favClassState}`} onClick={ () => favBtnHandler(p)}>{favTextState}</span>)
                }
            </li>
        );
    }

    const filteredProducts = types ? products.filter((t) => t.type === types) : products;

    if (error) throw error; 
    if (loading) return <Loader/>
    if (products.length === 0) return <PageNotFound content="Couldn't find any products." />;
    
    return (<>
        <section className="products">
			<div className="products__container">
				<div className="products__container__aside">
					<a className="filter__btn" onClick={openFilterMenu}><img src="/images/icons/icon_filter.svg" alt="Filter-option icon"/></a>
					<ul id="mbl__filter" className={clicked ? "show" : "hide"}> 
						<li>Crochet (2)</li>
						<li className="list__heading">Ceramic (5)</li>
						<li className="list__sub">Porous (0)</li>
						<li className="list__sub active">Glazed (4)</li>
						<li className="list__sub">Nude (1)</li>
						<li className="list__sub">Rough (0)</li>
						<li>Vowen (13)</li>
					</ul>
				</div>
				<div className="products__container__main">	
					<div>	
						<ul className="bradcrumbs">
							<li><a href="#">Decor</a></li>
                            <li><a href="#">Pots</a></li>
							<li>Ceramic</li>
						</ul>
	
						<h1>Handcrafted Pots</h1><span>{`${filteredProducts.length} ${filteredProducts.length === 1 ? "Item" : "Items" } `}</span>
                        <select id="type" className="filter__select" value={types} onChange={(event) => setType(event.target.value)}>
                            <option value="" defaultValue disabled="disabled">Filter By</option>
                            <option value="">All</option>
                            <option value="stoneware">Stoneware</option>
                            <option value="porcelain">Porcelain</option>
                            <option value="earthenware">Earthenware</option>
                        </select>
					</div>

					<ul className="cards">
                        {filteredProducts.map(renderProduct)}
					</ul>
				</div>
			</div>
		</section>
    </>);
}
