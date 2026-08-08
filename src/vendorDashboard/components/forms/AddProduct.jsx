import { useState } from "react"
import { API_URI } from "../../data/apiPath";

const AddProduct = () => {

    const [productName, setProductName] = useState("");
    const [price , setPrice] = useState("");
    const [category, setCategory]  = useState([]);
    const [bestSeller , setBestSeller] = useState(null);
    const [description, setdescription] = useState("");
    const [file, setfile] = useState(null);

    const categoryCheckboxHandler = (e)=>{
        const value = e.target.value;
        if(category.includes(value)){
            category.filter(item => item !== value);
        }else{
            setCategory([...category,value])
        }

    }
    const handleBestseller = (e)=>{
        setBestSeller(e.target.value === "true")
    }
    const handlesubmit = async (e)=>{
        e.preventDefault();
        try {
            const restaurantid = localStorage.getItem("Restaurantid");
            const fd = new FormData();
            fd.append("productName",productName)
            fd.append("price" , price)
            category.forEach(element => {
                fd.append("category",element)
            });
            fd.append("description",description)
            fd.append("image",file)
            fd.append("bestSeller",bestSeller)

            const response = await fetch(`${API_URI}/product/add-product/${restaurantid}`,{
                method : "POST",
                    // headers :{
                    //     "Content-Type" :"application/json"
                    // },
                body : fd
            })
            if(response.ok){
                console.log("product Added successfully");
                alert("product added Successfully")
                setProductName("");
                setPrice("");
                setCategory([])
                setdescription("");
                setfile(null)
            }
        } catch (error) {
            console.log("Error product added failed.", error)
        }
        
    }
  return (
    <div className="form-container">
        <h1 className="form-title">Add Product</h1>
        <form onSubmit={handlesubmit}>
            <div className="form-group">
                <label className="form-label" >ProductName</label>
                <input type="text" className="form-input" placeholder="ProductName" name  = "productName" value = {productName} onChange={(e)=>{setProductName(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">price</label>
                <input type="text" className="form-input" placeholder="price" name="price" value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Category</label>
                {/* <input type="text" className="form-input" placeholder="Category"/> */}
                <div className="option-group">
                    <label>
                        <input type="checkbox" value="veg" checked = {category.includes('veg')} onChange={categoryCheckboxHandler} /> Veg
                    </label>
                    <label>
                        <input type="checkbox" value="non-veg" checked = {category.includes('non-veg')} onChange={categoryCheckboxHandler} />Non-Veg
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">BestSeller</label>
                {/* <input type="text" className="form-input" placeholder="Category"/> */}
                <div className="option-group">
                    <label>
                        <input type="radio" value="true" checked = {bestSeller === true } onChange={handleBestseller}/> yes
                        {/* here checked is used just to tell browser wether it is checked or not(controller way) usefull when after submitting we have to make both null.*/}
                    </label>
                    <label>
                        <input type="radio" value="false" checked = {bestSeller === false} onChange={handleBestseller} />No
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">description</label>
                <textarea className="form-textarea" placeholder="Add description" name="description" value={description} onChange={(e)=>{setdescription(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label" >Image</label>
                <input type="file" className="form-file" accept = "image/*" onChange={(e)=>{setfile(e.target.files[0])}}/> 
            </div>
            
            <div className="button-container">
                <button className="form-button" type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct