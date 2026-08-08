const SideBar = ({showAddProductHandler,showAddRGroupHandler}) => {

  const logoutHandler = (e)=>{
    e.preventDefault();
    localStorage.clear();
  }
  const removeRestaurantid = (e)=>{
    e.preventDefault();
    localStorage.removeItem("Restaurantid")
  }
  return (
    <div className="sidebar-dev">
      <ul className="sidebar-ul">
        <li onClick={showAddRGroupHandler}>Add Restaurant</li>
        <li onClick={showAddProductHandler}>Add Product</li>
        <li>All Products</li>
        <li>User</li>
        <li onClick={logoutHandler}>Clear All</li>
        <li onClick={removeRestaurantid}>🗑️ Rid</li>
      </ul>
    </div>
  );
};

export default SideBar;