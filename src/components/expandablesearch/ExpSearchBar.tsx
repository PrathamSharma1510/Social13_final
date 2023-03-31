
import "./ExpSearchBar.css"


import React from 'react'

function ExpSearchBar() {
    return (
        <div className="search-bar" >
        <input type="text" className="search-bar__input" placeholder="Search creator, posts, NFTs and more.." aria-label="search"/>
        <button className="search-bar__submit" aria-label="submitsearch"> <img src="./images/search.svg" alt=""/>
        </button>
        
    </div>
    )
}

export default ExpSearchBar


