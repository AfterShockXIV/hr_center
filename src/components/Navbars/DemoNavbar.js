import React from "react";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Container,
} from "reactstrap";
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import './Navbar.scss'

function Header(props) {
  const sidebarToggle = React.useRef();
  const location = useLocation();
 
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)

  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  const handleLogout = () => {
 
    localStorage.clear()
    window.location.href = "/";
  };

  const name = localStorage.getItem("hr_employeename");
  const surname = localStorage.getItem("hr_surname");
  
  return (

    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      expand="lg"
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
        </div>
        <div style={{ color: "black" , flex: 1}}>
        <span  className="NavUserFont">User : {`${name.slice(1,-1)}  ${surname.slice(1,-1)}`} </span>
        </div>
       

        <IconButton
          title="LOGOUT"
          aria-label="LOGOUT"
          size="small"
          color="error"
          style={{position: 'absolute', right: 10}}
          onClick={handleLogout}
        >
          < LogoutIcon fontSize="inherit" />LOGOUT
        </IconButton>

      </Container>
    </Navbar>
  );
}

export default Header;
