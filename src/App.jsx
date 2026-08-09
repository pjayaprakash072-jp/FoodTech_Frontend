import { Route, Routes } from "react-router-dom"
import LandingPage from "./vendorDashboard/pages/LandingPage"
import PageNotFound from "./vendorDashboard/components/PageNotFound"

const App = () => {
  return (
    <div> 
      <Routes>
        <Route path="/" element = {<LandingPage/>}/>
        <Route path="/*" element = {<PageNotFound/>}/>
      </Routes>
      
      </div>
  )
}

export default App