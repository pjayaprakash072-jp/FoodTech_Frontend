const NavBar = ({showLoginHandler , showRegisterHandler , showLogout,logoutHandler}) => {
  console.log(showLoginHandler)
  return (
    <div className="navbar-dev">
      <div>Vendor Dashboard</div>

      <div>
        {
          (!showLogout ? <>
          <span className="loginbtn" onClick={showLoginHandler}>Login / </span>
          <span  className="registerbtn" onClick={showRegisterHandler}>Register</span>
          </>
          :
          <span  className="registerbtn" onClick={logoutHandler}>Logout</span>
          )
        }
        
      </div>
    </div>
  );
};

export default NavBar;