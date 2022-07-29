import React from "react";
import { Navbar } from "react-bootstrap";

const MainNavbar = (props) => {
  return (
    <div>
      <>
        <Navbar bg="dark" variant="dark" className="justify-content-center">
          <Navbar.Brand style={{ color: "red", textAlign: "center" }}>
            {props.name}
          </Navbar.Brand>
        </Navbar>
        <br />
      </>
    </div>
  );
};

export default MainNavbar;
