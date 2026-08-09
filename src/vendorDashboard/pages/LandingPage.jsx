import {  useEffect, useState } from "react"
import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import AddProduct from "../components/forms/AddProduct"
import Login from "../components/forms/Login"
import Register from "../components/forms/Register"
import AddRGroup from "../components/forms/AddRGroup"
import Welcome from "../components/Welcome"
import AllProducts from "../components/AllProducts"



const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddRGroup, setShowAddRGroup] = useState(false)
  const[showAddProduct , setshowAddProduct] =useState(false);
  const[showWelcome, setShowWelcome] = useState(false);
  const [showAllproducts, setShowAllProducts] = useState(false)
  const [showLogout, setShowLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true)

  // useEffect(()=>{
  //   const token = localStorage.getItem('loginToken');
  //   if(token){
  //     setShowLogout(true);
  //     setShowWelcome(true);// here defaultly when logout login occur logout shows and wellcome also show if u are in any page and u wnat reload the u want to there in that page mean u add item in locastoreage as current and write conditions for reload in this block to stay in current page.
  //   }
  // },[])

  // const logoutHandler = ()=>{
  //   alert("Are you sure ? ")
  //   localStorage.clear();
  //   setShowLogout(false);
  //   window.location.reload();
  // }
  

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    const currentPage = localStorage.getItem("currentPage");

    if (token) {
      // User is logged in
      setShowLogout(true);

      // Restore the page that was open before refresh
      if (currentPage === "login") {
        setShowLogin(true);
      }
      else if (currentPage === "register") {
        setShowRegister(true);
      }
      else if (currentPage === "addRestaurant") {
        setShowAddRGroup(true);
      }
      else if (currentPage === "addProduct") {
        setshowAddProduct(true);
      }
      else if (currentPage === "allProducts") {
        setShowAllProducts(true);
      }
      else {
        // Default page after login
        setShowWelcome(true);
        localStorage.setItem("currentPage", "welcome");
      }
    }
    setIsLoading(false)
  }, []);


  const logoutHandler = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      // Remove login information and current page
      localStorage.clear();

      setShowLogout(false);

      // Reload application
      window.location.reload();
    }

  };
  
  // Don't render the application until localStorage is checked 
  if (isLoading) { return null; }

  
  const showLoginHandler = ()=>{
    localStorage.setItem("currentPage", "login");
    setShowLogin(true);
    setShowRegister(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);

  }
  
  const showRegisterHandler = ()=>{
    localStorage.setItem("currentPage", "register");
    setShowRegister(true);
    setShowLogin(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);

  }
  
  const showAddRGroupHandler= ()=>{
    if(showLogout){
      localStorage.setItem("currentPage", "addRestaurant");
      setShowAddRGroup(true);
      setshowAddProduct(false);
      setShowRegister(false);
      setShowWelcome(false);
      setShowLogin(false);
      setShowAllProducts(false);

    }else{
      alert("please login");
    setShowLogin(true);
    setShowRegister(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    }

  }
  
  const showAddProductHandler = ()=>{
    if(showLogout){
      localStorage.setItem("currentPage", "addProduct");
      setshowAddProduct(true);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddRGroup(false);
      setShowWelcome(false);
      setShowAllProducts(false);

    }else{
      alert("please login");
    setShowLogin(true);
    setShowRegister(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    }

  }
  const showWelcomeHandler = ()=>{
    localStorage.setItem("currentPage", "welcome");
    setshowAddProduct(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowAddRGroup(false);
    setShowAllProducts(false);
    setShowWelcome(true);
  }
  const showAllProductsHandler = ()=>{
    if(showLogout){
      localStorage.setItem("currentPage", "allProducts");
      setshowAddProduct(false);
      setShowLogin(false);
      setShowRegister(false);
      setShowAddRGroup(false);
      setShowWelcome(false);
      setShowAllProducts(true);

    }else{
      alert("please login");
    setShowLogin(true);
    setShowRegister(false);
    setShowAddRGroup(false);
    setshowAddProduct(false);
    setShowWelcome(false);
    setShowAllProducts(false);
    }
  }
  
  return (
    <div className="h-screen flex flex-col">
      <NavBar showLoginHandler = {showLoginHandler} showRegisterHandler = {showRegisterHandler} showLogout = {showLogout} logoutHandler = {logoutHandler}/>
      <div className="flex flex-1">
        <SideBar showAddProductHandler = {showAddProductHandler} showAddRGroupHandler = {showAddRGroupHandler} showAllProductsHandler = {showAllProductsHandler}/>
        <div className="flex-1 p-4 flex justify-center items-start pt-[50px]">
          {showLogin &&  <Login showWelcomeHandler = {showWelcomeHandler}/>}
          {showRegister &&  <Register  showLoginHandler = {showLoginHandler}/>}
          {showAddRGroup && showLogout && <AddRGroup/>}
          {showAddProduct && showLogout && <AddProduct/>}
          {showWelcome && <Welcome/>}
          {showAllproducts && showLogout && <AllProducts/>}
        </div>
      </div>
    </div>
  )
}

export default LandingPage