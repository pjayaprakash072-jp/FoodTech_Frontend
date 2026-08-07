import { Route, Routes } from "react-router-dom"
import LandingPage from "./vendorDashboard/pages/LandingPage"

const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/landingpage" element = {<LandingPage/>}/>
      </Routes>
      
      </div>
  )
}

export default App