import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <div className="m-[300px]"><h1>PageNotFound 404
        <Link to="/" className="bg-red-800 text-white"><br /> go back</Link></h1></div>
  )
}

export default PageNotFound