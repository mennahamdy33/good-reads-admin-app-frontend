
  import React, { useState, useRef } from "react";
  import "./AuthorModal.css";
  import { Modal } from "react-bootstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
  import {
    Form,
    Button,
  
  } from "react-bootstrap";

  function AuthorModal(props) {
    const [showModal, setShow] = useState(false);

    // const bookNameInputRef = useRef();
    // const categoryInputRef = useRef();
    const authorInputRef = useRef();

    function submitHandler(event) {
      event.preventDefault();
      // const name = bookNameInputRef.current.value;
      // const CategoryId = categoryInputRef.current.value;
      const AuthorId = authorInputRef.current.value;
      // bookNameInputRef.current.value = "";
      // categoryInputRef.current.value = "";
      const authorData = {
        // name,
        // CategoryId,
        AuthorId,
      };
      if(props.label === 'Add'){
      fetch("https://good-reads-server.herokuapp.com/admin/authors", {
        method: "POST",
        body: JSON.stringify(authorData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
    else{

        fetch(
            `https://good-reads-server.herokuapp.com/admin/authors/${props.author._id}`,
            {
              method: "PATCH",
              body: JSON.stringify(authorData),
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
            });
        
    }
    


      props.change(true);

      setShow(false);
    }

    const handleClose = () => setShow(false);
    const handleShow = async () => {
      setShow(true);
    };

    return (
      <div className="ipField">
        <Button variant="primary" onClick={handleShow} className="openBtn">
          {props.label}
        </Button>
        <Modal show={showModal} onHide={handleClose} className="myModal">
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>First Name: </Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="ex: Joanne"
                  autoFocus
                  ref={authorInputRef}
                  defaultValue={ props.author.firstName }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Last Name: </Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="ex: Rowling"
                  autoFocus
                  ref={authorInputRef}
                  defaultValue={ props.author.lastName }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <div>
                <div className="row">
                    <div className="col-md-4">
                        <Form.Group controlId="dob">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                </div>
            </div>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Photo: </Form.Label>
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
            <Button variant="primary" onClick={submitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  export default AuthorModal;