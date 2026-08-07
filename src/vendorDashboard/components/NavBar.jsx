const NavBar = ({showLoginHandler , showRegisterHandler}) => {
  console.log(showLoginHandler)
  return (
    <div className="navbar-dev">
      <div>Vendor Dashboard</div>

      <div>
        <span className="loginbtn" onClick={showLoginHandler}>Login / </span>
        <span  className="registerbtn" onClick={showRegisterHandler}>Register</span>
      </div>
    </div>
  );
};

export default NavBar;