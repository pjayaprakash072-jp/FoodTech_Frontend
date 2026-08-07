import { useState } from "react"

// global styles are using form the index.css
import { API_URI } from "../../data/apiPath";
const Register = () => {

  const [username, setusername] = useState("");
  const [email,setemail] = useState("");
  const [password, setpassword] = useState("");


  const handlesubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/vendor/register`,
        {
          method : "POST",
          headers :{
            "Content-Type":"application/json"
          },
          body: JSON.stringify({username, email, password})
        }
      )
      const data = await response.json();
      if(response.ok){
        console.log(data);
        alert("vendor registered successfull!")
      }
    } catch (error) {
      console.log("Error Vendor registration failed" ,error);
      alert("Vendor Registration failed.")
    }
  }
  return (
    <div className="form-container">

      <h1 className="form-title">
        Vendor Regisgter
      </h1>

      <form onSubmit={handlesubmit}>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input type="text" placeholder="Enter Username" className="form-input" value={username} name="username" onChange={(e)=>{setusername(e.target.value)}}/>
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" placeholder="Enter Email" className="form-input" value={email} name="email" onChange={(e)=>{setemail(e.target.value)}}/>
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" placeholder="Enter Password" className="form-input" value={password} name="password" onChange={(e)=>{setpassword(e.target.value)}} />
        </div>

        <div className="button-container">
          <button type="submit" className="form-button">Submit</button>
        </div>

      </form>

    </div>
  )
}

export default Register