
  import React, { useState, useRef } from "react";
  import "./BookModal.css";
  import { Modal } from "react-bootstrap";
  import "bootstrap/dist/css/bootstrap.min.css";
  import {
    Form,
    Button,
  
  } from "react-bootstrap";

  function BookModal(props) {
    const [showModal, setShow] = useState(false);

    const bookNameInputRef = useRef();
    const categoryInputRef = useRef();
    const authorInputRef = useRef();

    function submitHandler(event) {
      event.preventDefault();
      const name = bookNameInputRef.current.value;
      const CategoryId = categoryInputRef.current.value;
      const AuthorId = authorInputRef.current.value;
      bookNameInputRef.current.value = "";
      categoryInputRef.current.value = "";
      const bookData = {
        name,
        CategoryId,
        AuthorId,
      };
      if(props.label === 'Add Book'){
      fetch("https://good-reads-server.herokuapp.com/admin/books", {
        method: "POST",
        body: JSON.stringify(bookData),
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
            `https://good-reads-server.herokuapp.com/admin/books/${props.book._id}`,
            {
              method: "PATCH",
              body: JSON.stringify(bookData),
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
                <Form.Label>Book Name: </Form.Label>
                <Form.Control
                  type="textarea"
                  placeholder="ex: Harry Potter"
                  autoFocus
                  ref={bookNameInputRef}
                  defaultValue={ props.book.name }
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  ref={categoryInputRef}
                  aria-label="Default select example"
                  defaultValue={ props.book.CategoryId}
                >
                  <option >Category</option>
                  {props.loadedCategories.map((val) => {
                    return <option value={val._id}>{val.name} </option>;
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Select
                  ref={authorInputRef}
                  aria-label="Default select example"
                  defaultValue={ props.book.AuthorId}
                >
                  <option>Author</option>

                  {props.loadedAuthors.map((val) => {
                    return (
                      <option value={val._id}>
                        {val.firstName} {val.lastName}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
            <Button variant="primary" onClick={submitHandler}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  export default BookModal;