import { useState } from 'react';
import { API_URI } from './../../data/apiPath';
const Login = ({showWelcomeHandler}) => {

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const  handlesubmit= async(e)=>{
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/vendor/login`,
        {
          method : "POST",
          headers:{
            "Content-Type":"application/json"
          },
          body : JSON.stringify({email, password})
        }
      )
      if(response.ok){
        setemail("")
        setpassword("")
        const data = await response.json();
        alert("vendor login successfully")
        localStorage.setItem("loginToken" , data.token)
        localStorage.setItem("vendorname" , data.vendorname)
        // console.log(data.username)
        showWelcomeHandler();
      }
    } catch (error) {
      console.log("Error", error)
      
    }
  }
  return (
    <div className="form-container">

      <h1 className="form-title">
        Vendor Login
      </h1>

      <form onSubmit={handlesubmit}>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input type="email" placeholder="Enter Email" className="form-input" name='email' value={email} onChange={(e)=>{setemail(e.target.value)}} />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input type="password" placeholder="Enter Password" className="form-input" name='password' value={password} onChange={(e)=>{setpassword(e.target.value)}} />
        </div>

        <div className="button-container">
          <button type="submit" className="form-button">Submit</button>
        </div>

      </form>

    </div>
  );
};

export default Login;