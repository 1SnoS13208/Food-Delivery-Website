import React, { useContext } from 'react'
import './Wishlist.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../../components/FoodItem/FoodItem'

const Wishlist = () => {

  const { food_list, wishlist } = useContext(StoreContext);

  return (
    <div className='wishlist'>
      <h2>My Wishlist</h2>
      <div className="wishlist-display-list">
        {food_list.map((item, index) => {
          if (wishlist[item._id]) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          }
        })}
      </div>
      {Object.keys(wishlist).length === 0 && <p className='empty-wishlist'>Your wishlist is empty.</p>}
    </div>
  )
}

export default Wishlist