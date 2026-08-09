import { useEffect, useState } from "react"
import { API_URI } from "../data/apiPath";

const AllProducts = () => {
    const [showProducts, setShowProducts] = useState([]);


    const showProductHandler = async ()=>{

        const rgid = localStorage.getItem("Restaurantid");
        if(!rgid){
            console.log("restaurant not found")
        }
        const response = await fetch(`${API_URI}/product/${rgid}/products`);
        const data = await response.json();
        if(response.ok){
            const products = data.products;
            console.log(products);
            console.log(data);
            setShowProducts(products)
        }
    }
    useEffect(()=>{
        showProductHandler();
        console.log("this is effect")
    },[])

    const deleteProductHandler = async(id)=>{
        try {
            const response = await fetch(`${API_URI}/product/delete/${id}`,
                {
                    method : "DELETE"
                }
            )
            if(response.ok){
                alert("product deleted successfully");
                setShowProducts(showProducts.filter(products => products._id !== id))
            }
        } catch (error) {
            console.log("Failed to delete porduct",error)
        }
    }
  return (
    <div>{showProducts.length === 0 ? (
    <h1>No products is there</h1>
    ):(
        <table>
            <thead>
                <tr>
                    <th>Product name</th>
                    <th>Price</th>
                    <th>image</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    showProducts.map((item)=>{
                        return(
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>
                                    <img src={`${API_URI}/uploads/${item.image}`} width="100" height="100" alt={item.productName} />
                                </td>
                                <td>
                                    <button onClick={()=>{deleteProductHandler(item._id)}}>delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )}</div>
  )
}

export default AllProducts