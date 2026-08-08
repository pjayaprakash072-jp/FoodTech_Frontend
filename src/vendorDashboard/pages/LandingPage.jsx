import { useState } from "react"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import AddProduct from "../components/forms/AddProduct"
import Login from "../components/forms/Login"
import Register from "../components/forms/Register"
import AddRGroup from "../components/forms/AddRGroup"
import Welcome from "../components/Welcome"


const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddRGroup, setShowAddRGroup] = useState(false)
  const[showAddProduct , setshowAddProduct] =useState(false);
  const[showWelcome, setShowWelcome] = useState("");
  
  const showLoginHandler = ()=>{
    setShowLogin(true);
    setShowRegister(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
  }
  
  const showRegisterHandler = ()=>{
    setShowRegister(true);
    setShowLogin(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
  }
  
  const showAddRGroupHandler= ()=>{
    setShowAddRGroup(true);
    setshowAddProduct(false);
    setShowRegister(false);
    setShowLogin(false);
  }
  
  const showAddProductHandler = ()=>{
    setshowAddProduct(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddRGroup(false);
  }
  const showWelcomeHandler = ()=>{
    setshowAddProduct(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddRGroup(false);
    setShowWelcome(true);
  }
  return (
    <div className="h-screen flex flex-col">
      <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler}/>
      <div className="flex flex-1">
        <SideBar showAddProductHandler = {showAddProductHandler} showAddRGroupHandler = {showAddRGroupHandler}/>
        <div className="flex-1 p-4 flex justify-center items-start pt-[50px]">
          {showLogin && <Login showWelcomeHandler = {showWelcomeHandler}/>}
          {showRegister && <Register  showLoginHandler = {showLoginHandler}/>}
          {showAddRGroup && <AddRGroup/>}
          {showAddProduct && <AddProduct/>}
          {showWelcome && <Welcome/>}
        </div>
      </div>
    </div>
  )
}

export default LandingPage