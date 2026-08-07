import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
import AddProduct from "../components/forms/AddProduct"
// import Login from "../components/forms/Login"
// import Register from "../components/forms/Register"
// import AddRGroup from "../components/forms/AddRGroup"


const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar/>
      <div className="flex flex-1">
        <SideBar/>
        <div className="flex-1 p-4 flex justify-center items-start pt-[50px]">
          {/* <Login/> */}
          {/* <Register/> */}
          {/* <AddRGroup/> */}
          <AddProduct/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage