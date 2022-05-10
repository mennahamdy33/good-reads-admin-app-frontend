import React, {  useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Home from "./Home";
import "./Author.css"
// import React, { useState} from "react";
// import MyNavbar from "../../layout/navbar/navbar";
// import Books from "./Books";
// import Category from "./Category";
// import Home from './Home';
// function Author() {
  //   const [activePage, setActivePage]=useState(0);
  //   function BookHandler(){
  //       setActivePage(1);
  //   }
  //   function AuthorHandler(){
  //       setActivePage(2);
  //   }
  //   function CategoryHandler(){
  //       setActivePage(3);
  //   }
  //  if(activePage===1){
  //       return <Books/>
  //   } else if(activePage===2){
  //     return <Author/>
  //   }else if(activePage===3){
  //       return <Category/>
  //     }
    // return (
    //   <Home active="Author">

    // <div>
      {/* <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active="Author"/> */}
  //   <div>Author</div>
  //   </div>
  //   </Home>

  //   );
  // }
  // export default Author;


  function App() {
    const [showModal, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
          <Button variant="primary" onClick={handleShow}>
            Launch demo modal
          </Button>
        </div>
        <Modal show={showModal} onHide={handleClose} className="myModal">
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
  export default App;