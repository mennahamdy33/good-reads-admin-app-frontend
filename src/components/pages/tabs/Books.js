import React, { useState, useEffect } from "react";
import "./Books.css";
import Home from "./Home";
import Category from "./Category";
import { Modal, Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Form,
  Button,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import "./Author.css";
function Books() {
  const [loadedbooks, setLoadedbooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] =useState(false);
function DeleteHandler(val){
  fetch(`http://localhost:5000/admins/books/${val._id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      // setIsDeleted(true);
      return response.json()})
    .then((json) => {console.log(json)
    // if(isDeleted){
      setIsDeleted(true)
  
    // }
    });
   
    

}

  useEffect(() => {
    fetch("https://good-reads-server.herokuapp.com/admins/books")
      .then((response) => {
        // console.log("outer then 1");
        return response.json();
      })
      .then(async (data) => {
        // console.log("outer then 2");
        setIsLoading(false);
        setLoadedbooks(data);
        console.log(data)
      
      
      })
      setIsDeleted(false)

  }, [isDeleted]);

  if (isLoading) {
    return (
      <Home active="Books">
        <section>Loading...</section>
      </Home>
    );
  }

  function BookInput({ onSubmit, label = "Add Book", inputValue }) {
    let [value, setValue] = useState(inputValue);
    const [showModal, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return (
      <div className="ipField">
        {/* <input
          className="ipTxt"
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button
          className="ipBtn"
          onClick={() => {
            onSubmit(value);
            setValue("");
          }}
        >
          {label}
        </button> */}

        <Button variant="primary" onClick={handleShow} className="openBtn">
          Add Book
        </Button>
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
      </div>
    );
  }


  return (
    <Home active="Books">
      <div>
        <BookInput
          onSubmit={(value) => {
            console.log(value);
            console.log("submitted");
          }}
        />

        <div className="App">
          <table>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>Name</th>
              <th>CategoryID</th>
              <th>AuthorID</th>
              <th>Actions</th>
            </tr>
            {loadedbooks.map((val, key) => {
           
              return (
                <tr key={key}>
                  <td>{key+1}</td>
                  <td>{val.photo}</td>
                  <td>{val.name}</td>
                  
                  <td>{val.category[0].name}</td>

                  <td>{val.author[0].firstName} {val.author[0].lastName}</td>
                  <td>
                  <button className="xBtn" onClick={() => {DeleteHandler(val)}}>
         x
         </button>
         <button className="xBtn" onClick={() => console.log('edited')}>
          edit
        </button>            
              </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </Home>
  );
}
export default Books;
