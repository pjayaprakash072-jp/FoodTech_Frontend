
const Welcom = () => {
  const vendorname = localStorage.getItem('vendorname')
  return (
    <div><h1>Welcome {vendorname} !</h1></div>
  )
}

export default Welcom