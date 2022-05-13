import React, { useState} from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
// import NavLink from "@material-tailwind/react/NavLink";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
import "../navbar.css";


export default function MyNavbar(props) {
    const [openMenu, setOpenMenu] = useState(false);
    
    return (
        <Navbar color="cyan" expand="md">
            <NavbarContainer>
                <NavbarWrapper>
                    <NavbarBrand>Home Page</NavbarBrand>
                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenMenu(!openMenu)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openMenu} expand="md"  id="responsive-navbar-nav">
                    <Nav>
                        <NavItem onClick={()=>{props.onClickCategory()}} active={(props.active==="Category")?"dark":""} ripple="light">
                            {/* <Icon name="language" size="xl" /> */}
                            Categories
                        </NavItem>
                        <NavItem onClick={()=>{props.onClickBook()}} active={(props.active==="Books")?"dark":""} ripple="light">
                            {/* <Icon name="account_circle" size="xl" /> */}
                            Books
                        </NavItem>
                        <NavItem onClick={()=>{props.onClickAuthor()}} active={(props.active==="Author")?"dark":""} ripple="light">
                            {/* <Icon name="settings" size="xl" /> */}
                            Authors
                        </NavItem>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}