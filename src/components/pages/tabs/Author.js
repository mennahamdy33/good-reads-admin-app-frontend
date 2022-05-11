import React, { useState } from "react";
import { Modal, Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import Home from "./Home";
import "./Modal.css";
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
{
  /* <MyNavbar onClickBook={BookHandler} onClickCategory={CategoryHandler} onClickAuthor={AuthorHandler} active="Author"/> */
}
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
      <div>
        {/* className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }} */}
        <Button variant="primary" onClick={handleShow} className="openBtn">
          Add Book
        </Button>
      </div>
      <Modal show={showModal} onHide={handleClose} className="myModal">
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Book Name: </Form.Label>
              <Form.Control
                type="textarea"
                placeholder="Harry Potter"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div>
              <Dropdown>
                <Dropdown.Toggle >Category</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Horror</Dropdown.Item>
                  <Dropdown.Item href="#">Science Fiction</Dropdown.Item>
                  <Dropdown.Item href="#">Romance</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <div>
              <Dropdown>
                <Dropdown.Toggle >Author</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href="#">Menna Hamdy</Dropdown.Item>
                  <Dropdown.Item href="#">Eman Hesham</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Image: </Form.Label>
              <div className="input-group">
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="inputGroupFile01"
            aria-describedby="inputGroupFileAddon01"
          />
        </div>
      </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <br></br>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
