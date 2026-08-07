
const AddProduct = () => {
  return (
    <div className="form-container">
        <h1 className="form-title">Add Product</h1>
        <form action="">
            <div className="form-group">
                <label htmlFor="" className="form-label">ProductName</label>
                <input type="text" className="form-input" placeholder="ProductName"/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">price</label>
                <input type="text" className="form-input" placeholder="price"/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Category</label>
                {/* <input type="text" className="form-input" placeholder="Category"/> */}
                <div className="option-group">
                    <label>
                        <input type="checkbox" value="veg" /> Veg
                    </label>
                    <label>
                        <input type="checkbox" value="non-veg" />Non-Veg
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">bestseller</label>
                <input type="text" className="form-input" placeholder="bestseller"/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">description</label>
                <textarea className="form-textarea" placeholder="Add description"></textarea>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label" accept = "image/*">Image</label>
                <input type="file" className="form-file" /> 
            </div>
            
            <div className="button-container">
                <button className="form-button">Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct