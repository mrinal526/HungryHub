import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from '../components/ContextReducer';

export default function Cart() {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                 <div className='m-5 w-100 text-center fs-1 text-danger fst-italic fw-bold'>Your Cart is Empty!</div>
            </div>
        )
    }
    // const handleRemove = (index)=>{
    //   console.log(index)
    //   dispatch({type:"REMOVE",index:index})
    // }

    const handleCheckOut = async () => {
        let userEmail = localStorage.getItem("userEmail");
        // console.log(data,localStorage.getItem("userEmail"),new Date())
        let response = await fetch("http://localhost:5000/api/orderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({  // in case of fetch we should use stringify.....in case of axios it automatically stringify it
                order_data: data, // order_data variable should be same as req.body.variable_name(in OrderData.js(backend))  data is useCart() data
                email: userEmail,
                order_date: new Date().toDateString()  // time and data will be stored in order_date
            })
        });
        console.log("JSON RESPONSE:::::", response.status)
        if (response.status === 200) {
            dispatch({ type: "DROP" })  // this is used to empty the cart when we click on checkout
        }
    }
   // price calculation
    let totalPrice = data.reduce((total, food) => total + food.price, 0)
    return (
        <div>

            {console.log(data)}
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' style={{ height: '400px', overflow: 'scroll' }} >
                <table className='table table-hover table-striped table-dark '>
                    <thead className=' text-info fs-4 sticky-top'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody className=' text-white fs-4'>
                        {data.map((food, index) => (
                            <tr>
                                <th scope='row' >{index + 1}</th>
                                <td >{food.name}</td>
                                <td>{food.qty}</td>
                                <td>{food.size}</td>
                                <td>{food.price}</td>
                                <td >
                                    <button type="button" className="btn p-0 text-danger" ><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-white' >Total Price: ₹{totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5 mb-4 text-white' onClick={handleCheckOut} > Check Out </button>
                </div>
            </div>



        </div>
    )
}
