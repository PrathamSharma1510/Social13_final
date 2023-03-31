import React from 'react'
import { storeItems } from '../item'
import Items from '../items/Items'

const Store = () => {
    return (
        <div>
            <Items  items={storeItems} />
        </div>
    )
}

export default Store
