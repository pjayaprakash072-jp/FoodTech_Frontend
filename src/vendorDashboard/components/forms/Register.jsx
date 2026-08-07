
// global styles are using form the index.css
const Register = () => {
  return (
    <div className="form-container">

      <h1 className="form-title">
        Vendor Regisgter
      </h1>

      <form>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text" placeholder="Enter Username" className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" placeholder="Enter Email" className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" placeholder="Enter Password" className="form-input" />
        </div>

        <div className="button-container">
          <button type="submit" className="form-button">Submit</button>
        </div>

      </form>

    </div>
  )
}

export default Register