const SideBar = ({showAddProductHandler,showAddRGroupHandler}) => {
  return (
    <div className="w-full max-w-40 h-full bg-gray-500">
      <ul className="p-3 space-y-2 ">
        <li onClick={showAddRGroupHandler}>Add Restaurant</li>
        <li onClick={showAddProductHandler}>Add Product</li>
        <li>All Products</li>
        <li>User</li>
      </ul>
    </div>
  );
};

export default SideBar;