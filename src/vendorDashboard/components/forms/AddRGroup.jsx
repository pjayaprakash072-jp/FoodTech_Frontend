import { useState } from "react"
import { API_URI } from "../../data/apiPath";

const AddRGroup = () => {


    const [rgroupName, setRGroupName] = useState("");
    const [area , setArea] = useState("");
    const [category , setCategory] = useState([]);
    const [region, setRegion] = useState([])
    const [offer , setOffer] = useState("");
    const [file , setFile] = useState(null); // for images should be null.


    const categoryCheckBoxHandler = (e)=>{
        const value = e.target.value;
        if(category.includes(value)){
            setCategory(category.filter(item => item !== value))
        }else{
            setCategory([...category,value])
        }
    }
    const regionCheckBoxHandler = (e)=>{
        const value = e.target.value;
        if(region.includes(value)){
            setRegion(region.filter(item => item!== value))
        }else{
            setRegion([...region,value])
        }
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            
            const token = localStorage.getItem('loginToken');
            if(!token){
                console.error("user not authenticated.")
                return;// stoping the further
            }

            const  fd = new FormData();
            fd.append("RGroupName",rgroupName) // the key should be match with backend.
            fd.append("area" , area)
            fd.append("offer" ,offer)
            fd.append("image" , file)
            category.forEach((item) => {
                fd.append("category" , item);
            });
            region.forEach(item => {
                fd.append("region" , item)
            });

            const response  = await fetch(`${API_URI}/rgroup/add-rgroup`,
                {
                    method : "POST",
                    headers:{
                        "token" : `${token}`
                    },
                    body : fd
                }
            )
            const data = await response.json();
            if(response.ok){
                setRGroupName("");
                setArea("");
                setCategory([]);
                setRegion([])
                setOffer("");
                setFile(null)
                alert("RGroup added successfully")
                localStorage.setItem("Restaurantid" , data.RGroupid)
                console.log(data)
            }
        } catch (error) {
            alert("error")
            console.error("Error Faild to add RGroup" , error)
        }
    }
  return (
    <div className="form-container">
        <h1 className="form-title">Add Restaruent Group</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="" className="form-label">RGroupName</label>
                <input type="text" className="form-input" placeholder="RGroupName" value={rgroupName} name="rgroupName" onChange={(e)=>{setRGroupName(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Area</label>
                <input type="text" className="form-input" placeholder="Area" value ={area} name="area" onChange={(e)=>{setArea(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Category</label>
                {/* <input type="text" className="form-input" placeholder="Category"/> */}
                <div className="option-group">
                    <label>
                        <input type="checkbox" value="veg" checked = {category.includes('veg')} onChange={categoryCheckBoxHandler}/> Veg
                    </label>
                    <label>
                        <input type="checkbox" value="non-veg" checked = {category.includes('non-veg')} onChange={categoryCheckBoxHandler } />Non-Veg
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Region</label>
                <div className="option-group">
                    <label>
                        <input type="checkbox" value="Bakery" checked = {region.includes('Bakery')} onChange={regionCheckBoxHandler} /> Bakery
                    </label>
                    <label>
                        <input type="checkbox" value="Desserts" checked = {region.includes('Desserts')} onChange={regionCheckBoxHandler} /> Desserts
                    </label>
                    <label>
                        <input type="checkbox" value="Indian" checked = {region.includes('Indian')} onChange={regionCheckBoxHandler} /> Indian
                    </label>
                    <label>
                        <input type="checkbox" value="Italian" checked = {region.includes('Italian')} onChange={regionCheckBoxHandler} />Italian
                    </label>
                    <label>
                        <input type="checkbox" value="Chinese" checked = {region.includes('Chinese')} onChange={regionCheckBoxHandler} />Chinese
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Offer</label>
                <input type="text" className="form-input" placeholder="Offer" name="offer" value={offer} onChange={(e)=>{setOffer(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label" >Image</label>
                <input type="file" className="form-file" accept = "image/*" onChange={(e)=>{setFile(e.target.files[0])}}/> 
            </div>
            
            <div className="button-container">
                <button className="form-button" type="submit">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddRGroup