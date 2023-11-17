import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AddCardBtn from '../CartFile/AddCardBtn/AddCardBtn';

function SearchItem() {
    const location = useLocation().state;
    console.log("values:", location.searchData);
    const SearchResult = location.searchData;    
    return (
        <div>
            <h1 className="heading">Your Search Item's</h1>
            <div className="bestproduct">
                {SearchResult.map((item, index) => {
                    return (
                        <>
                        <div className="BPitem" key={index}>
                        <Link to={`/Product/${item.id}`}>
                            <img className="productimage" src={item.image} alt="Image1" />
                        </Link>
                        <div className="Productinfo">
                                <h2 className="pbrand">{item.minicategory}</h2>
                                <Link className="Link" to={`/Product/${item.id}`}><p className="pname">{item.name && item.name.slice(0, 30)}....</p></Link>
                                <h2 className="pprice"><span className="pofferprice">₹{item.price}</span> <span className="oldprice">₹{item.oldprice}</span> (20% OFF)</h2>
                                <AddCardBtn product={item}/>
                        </div>
                        </div> 
                        </>
                    )
                })}
            </div>
        </div>
    )
}

export default SearchItem;