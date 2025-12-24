import React, { useEffect } from "react";
import './List.css';
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";

const List = ({url}) => {
    const[list,setList]=useState([]);

    const fetchItems=async()=>{
        const response=await axios.get(`${url}/api/food/list`);
        if(response.data.success){
            setList(response.data.data);
        }
        else{
            toast.error("Error");
        }
    }

    const removeFood=async(foodId)=>{
        const response= await axios.post(`${url}/api/food/remove`,{id:foodId});
        if(response.data.success){
            toast.success(response.data.message);
            await fetchItems();
        }
        else{
            toast.error("Error");
        }
    }

    const toggleAvailability = async (id) => {
        const response = await axios.post(`${url}/api/food/toggle`, {id});
        if(response.data.success){
            toast.success(response.data.message);
            await fetchItems();
        } else {
            toast.error("Error");
        }
    }

    useEffect(()=>{
        fetchItems();
    },[])

  return (  
    <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table-header">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Stock</b>
            <b>Action</b>
        </div>
        {list.map((item,index)=>{
           return(
            <div key={index} className="list-table-row">
                <img src={`${url}/images/`+item.image} alt=""/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>${item.price}</p>
                <div className={`stock-toggle ${item.available ? 'available' : 'unavailable'}`} onClick={() => toggleAvailability(item._id)}>
                    {item.available ? 'In Stock' : 'Sold Out'}
                </div>
                <p onClick={()=>removeFood(item._id)} className='cursor'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </p>
            </div>
           )
        })}
    </div>
  )
}  

export default List;