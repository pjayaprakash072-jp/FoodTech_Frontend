const NavBar = ({showLoginHandler , showRegisterHandler}) => {
  console.log(showLoginHandler)
  return (
    <div className="flex justify-between bg-orange-500 h-10 items-center text-white px-6 ">
      <div>Vendor Dashboard</div>

      <div>
        <span onClick={showLoginHandler}>Login / </span>
        <span onClick={showRegisterHandler}>Register</span>
      </div>
    </div>
  );
};

export default NavBar;