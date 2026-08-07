import NavBar from "../components/NavBar"
import SideBar from "../components/SideBar"
// import Login from "../components/forms/Login"
import Register from "../components/forms/Register"


const LandingPage = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar/>
      <div className="flex flex-1">
        <SideBar/>
        <div className="flex-1 p-4 flex justify-center items-start pt-[120px]">
          {/* <Login/> */}
          <Register/>
        </div>
      </div>
    </div>
  )
}

export default LandingPage