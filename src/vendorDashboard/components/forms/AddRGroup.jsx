
const AddRGroup = () => {
  return (
    <div className="form-container">
        <h1 className="form-title">Add Restaruent Group</h1>
        <form action="">
            <div className="form-group">
                <label htmlFor="" className="form-label">RGroupName</label>
                <input type="text" className="form-input" placeholder="RGroupName"/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Area</label>
                <input type="text" className="form-input" placeholder="Area"/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Category</label>
                <input type="text" className="form-input" placeholder="Category"/>
            </div>
            <div className="form-group">
                <label htmlFor="" className="form-label">Offer</label>
                <input type="text" className="form-input" placeholder="Offer"/>
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

export default AddRGroup