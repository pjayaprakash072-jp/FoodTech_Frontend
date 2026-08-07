const NavBar = () => {
  return (
    <div className="flex justify-between bg-orange-500 h-10 items-center text-white px-6 ">
      <div>Vendor Dashboard</div>

      <div>
        <span>Login / </span>
        <span>Register</span>
      </div>
    </div>
  );
};

export default NavBar;