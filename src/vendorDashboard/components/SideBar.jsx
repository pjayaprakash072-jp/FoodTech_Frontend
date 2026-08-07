const SideBar = ({showAddProductHandler,showAddRGroupHandler}) => {
  return (
    <div className="sidebar-dev">
      <ul className="sidebar-ul">
        <li onClick={showAddRGroupHandler}>Add Restaurant</li>
        <li onClick={showAddProductHandler}>Add Product</li>
        <li>All Products</li>
        <li>User</li>
      </ul>
    </div>
  );
};

export default SideBar;