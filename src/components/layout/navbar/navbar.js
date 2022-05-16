import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavItem from "@material-tailwind/react/NavItem";
import 'bootstrap/dist/css/bootstrap.css';
import cat from '../../Assets/cat.png';
import books from '../../Assets/books.png';
import authors from '../../Assets/authors.png';
import book from '../../Assets/book.gif';


export default function MyNavbar(props) {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    //    sticky-top
    <Navbar className="bg-dark"  expand='md'>
      <NavbarContainer>
        <NavbarWrapper>
        <NavbarBrand>
              <img
                // src="https://i.pinimg.com/originals/b4/3d/43/b43d438638e2ed51d1f19dad2a4eb24d.gif"
                // src="https://media.baamboozle.com/uploads/images/150029/1627307562_172420_gif-url.gif"
                src={book}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt="logo"
              />
            </NavbarBrand>
          <NavbarBrand>Good Reads</NavbarBrand>
          <NavbarToggler
                        color="white"
                        onClick={() => setOpenMenu(!openMenu)}
                        ripple="light"
                    />
        </NavbarWrapper>

        <NavbarCollapse open={openMenu} expand="md" id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavItem
              onClick={() => {
                props.onClickCategory();
              }}
              active={props.active === "Category" ? "dark" : ""}
              ripple="light"
            >
                <img
                // src="https://i.pinimg.com/originals/b4/3d/43/b43d438638e2ed51d1f19dad2a4eb24d.gif"
                // src="https://cdn-icons-png.flaticon.com/512/7088/7088436.png"
                src={cat}
                width="25"
                height="25"
                className="d-inline-block align-top"
                alt="logo"
              />
              Categories
            </NavItem>
            <NavItem
              onClick={() => {
                props.onClickBook();
              }}
              active={props.active === "Books" ? "dark" : ""}
              ripple="light"
            >
                <img
                src={books}
                width="25"
                height="25"
                className="d-inline-block align-top"
                alt="logo"
              />
              Books
            </NavItem>
            <NavItem
              onClick={() => {
                props.onClickAuthor();
              }}
              active={props.active === "Authors" ? "dark" : ""}
              ripple="light"
            >
              <img
                src={authors}
                width="25"
                height="25"
                className="d-inline-block align-top"
                alt="logo"
              />
              Authors
            </NavItem>
          </Nav>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
    
  );
}
